import { getMyProfile } from '@/api/users';
import { redirect } from 'react-router';
import { reissueToken } from '@/api/auth';
import { data } from 'react-router';
import * as cookie from 'cookie';
import {
  convertSetCookieToCookieHeader,
  mergeCookieHeaders,
} from '@/utils/cookie';
export interface AuthResult {
  user: {
    nickname: string;
    profileImage: string;
    introduction: string;
    role: string;
  } | null;
  headers?: Headers;
}

export interface AuthOptions {
  required?: boolean; // 인증이 필수인지 (기본: false)
  redirectTo?: string; // 리디렉션할 경로 (기본: '/login')
  allowGuest?: boolean; // 게스트 허용 여부 (기본: true)
}

export const authenticateUser = async (
  request: Request,
): Promise<AuthResult> => {
  try {
    const requestCookie = request.headers.get('Cookie');

    if (!requestCookie) {
      return { user: null };
    }

    let user = await getMyProfile({
      headers: {
        Cookie: requestCookie,
      },
    });

    if (user) {
      return { user };
    }

    const refreshToken = cookie.parse(requestCookie)['refresh'];
    if (!refreshToken) {
      return { user: null };
    }

    const reissueResult = await reissueToken({
      headers: {
        Cookie: requestCookie,
      },
    });

    const setCookie = reissueResult.headers['set-cookie'];

    const newCookieHeaders = mergeCookieHeaders([
      requestCookie,
      convertSetCookieToCookieHeader(setCookie),
    ]);

    user = await getMyProfile({
      headers: {
        Cookie: newCookieHeaders,
      },
    });

    if (!user) {
      return { user: null };
    }

    const responseHeaders = new Headers();
    reissueResult.headers['set-cookie']?.map((cookie) => {
      responseHeaders.append('Set-Cookie', cookie);
    });

    return { user, headers: responseHeaders };
  } catch (error) {
    console.error('reissueToken error: ', error);
    return { user: null };
  }
};

export const auth = async (
  request: Request,
  options: AuthOptions = {},
): Promise<AuthResult> => {
  const {
    required = false,
    redirectTo = '/login',
    allowGuest = true,
  } = options;

  const authResult = await authenticateUser(request);

  // 인증이 필수인데 사용자가 없는 경우
  if (required && !authResult.user) {
    // 이미 로그인 페이지에 있다면 리디렉션하지 않음
    if (!request.url.includes(redirectTo)) {
      throw redirect(redirectTo);
    }
  }

  // 게스트를 허용하지 않는데 사용자가 없는 경우
  if (!allowGuest && !authResult.user) {
    throw redirect(redirectTo);
  }

  return authResult;
};

// 편의 함수들
export const requireAuth = (request: Request, redirectTo?: string) =>
  auth(request, { required: true, redirectTo });

export const optionalAuth = (request: Request) =>
  auth(request, { required: false });

export const guestOnly = (request: Request, redirectTo = '/') =>
  auth(request, { required: false }).then((result) => {
    if (result.user) {
      throw redirect(redirectTo);
    }
    return result;
  });

// 헬퍼 함수: 인증과 데이터 로딩을 함께 처리
export const withAuth = async <T>(
  request: Request,
  dataLoader?: ({ user, headers }: AuthResult) => Promise<T> | T,
  options: AuthOptions = {},
) => {
  const { user, headers } = await auth(request, options);
  const responseData = await dataLoader?.({ user, headers });

  return data({ user, data: responseData }, headers ? { headers } : undefined);
};

// 타입 헬퍼 - 보호된 라우트용
export const withRequiredAuth = async <T>(
  request: Request,
  dataLoader?: ({ user, headers }: AuthResult) => Promise<T> | T,
  redirectTo?: string,
) => {
  return withAuth(request, dataLoader, { required: true, redirectTo });
};

// 타입 헬퍼 - 선택적 인증용
export const withOptionalAuth = async <T>(
  request: Request,
  dataLoader?: ({ user, headers }: AuthResult) => Promise<T> | T,
) => {
  return withAuth(request, dataLoader, { required: false });
};
