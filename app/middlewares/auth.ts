import { getMyProfile } from '@/api/users';
import { userContext } from '@/context';
import * as cookie from 'cookie';
import { reissueToken } from '@/api/auth';
import {
  convertSetCookieToCookieHeader,
  mergeCookieHeaders,
} from '@/utils/cookie';
import { redirect, type unstable_MiddlewareFunction } from 'react-router';
import { AsyncLocalStorage } from 'node:async_hooks';

const requestStorage = new AsyncLocalStorage<{ request: Request }>();

export const getRequestStorage = () => {
  const storage = requestStorage.getStore();
  if (!storage) {
    return null;
  }
  return storage;
};

export const globalStorageMiddleware: unstable_MiddlewareFunction = (
  { request },
  next,
) => {
  return new Promise((resolve) => {
    requestStorage.run({ request }, () => {
      resolve(next());
    });
  });
};

/**
 * @description
 * 사용자 정보 조회 및 토큰 재발급
 */
export const sessionMiddleware: unstable_MiddlewareFunction = async (
  { request, context },
  next,
) => {
  try {
    const requestCookie = request.headers.get('Cookie');

    if (!requestCookie) {
      context.set(userContext, null);
      return;
    }

    // 1단계: 현재 토큰으로 사용자 정보 조회 시도
    const user = await tryGetProfile(requestCookie);

    if (user) {
      context.set(userContext, user);
      return;
    }

    // 2단계: 토큰 재발급 시도
    const { newUser, newCookies } =
      await tryReissueAndGetProfile(requestCookie);

    context.set(userContext, newUser);

    if (newCookies) {
      request.headers.set(
        'Cookie',
        mergeCookieHeaders([
          requestCookie,
          convertSetCookieToCookieHeader(newCookies),
        ]),
      );
    }

    const response = (await next()) as Response;

    // 새로운 쿠키가 있으면 response에 추가
    if (newCookies) {
      newCookies.forEach((cookieValue: string) => {
        response.headers.append('Set-Cookie', cookieValue);
      });
    }

    return response;
  } catch (error) {
    console.error('authMiddleware error:', error);
    context.set(userContext, null);
    return;
  }
};

/**
 * @description
 * 로그인 상태를 확인하여 로그인되지 않은 경우 로그인 페이지로 리다이렉션
 */
export const requireAuthMiddleware: unstable_MiddlewareFunction = async ({
  context,
}) => {
  const user = context.get(userContext);
  if (!user) {
    return redirect('/login');
  }
};

async function tryGetProfile(cookieHeader: string) {
  try {
    return await getMyProfile({
      headers: { Cookie: cookieHeader },
    });
  } catch (error) {
    console.error('Profile fetch failed:', error);
    return null;
  }
}

async function tryReissueAndGetProfile(originalCookie: string) {
  try {
    const refreshToken = cookie.parse(originalCookie)['refresh'];
    if (!refreshToken) {
      return { newUser: null, newCookies: null };
    }

    const reissueResult = await reissueToken({
      headers: { Cookie: originalCookie },
    });

    const setCookie = reissueResult.headers['set-cookie'];
    if (!setCookie) {
      return { newUser: null, newCookies: null };
    }

    // 새로운 쿠키로 프로필 조회
    const newCookieHeader = mergeCookieHeaders([
      originalCookie,
      convertSetCookieToCookieHeader(setCookie),
    ]);

    const user = await tryGetProfile(newCookieHeader);

    return {
      newUser: user,
      newCookies: setCookie,
    };
  } catch (error) {
    console.error('Token reissue failed:', error);
    return { newUser: null, newCookies: null };
  }
}
