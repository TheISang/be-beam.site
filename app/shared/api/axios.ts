import { reissueToken } from '@/shared/api/endpoints/auth';
import { API_V2_BASE_URL } from '@/shared/constants/api';
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

// 토큰 재발급 상태 관리를 위한 인터페이스
interface TokenRefreshState {
  isRefreshing: boolean;
  failedQueue: Array<{
    resolve: (value: string) => void;
    reject: (error: Error) => void;
  }>;
}

// 토큰 재발급 상태
const tokenRefreshState: TokenRefreshState = {
  isRefreshing: false,
  failedQueue: [],
};

// 대기 중인 요청들을 처리하는 함수
const processQueue = (
  error: Error | null,
  token: string | null = null,
): void => {
  tokenRefreshState.failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });

  tokenRefreshState.failedQueue = [];
};

// 401 에러인지 확인하는 함수
const isTokenExpiredError = (error: AxiosError): boolean => {
  return error.response?.status === 401;
};

// 재발급 API 호출에서 발생한 에러인지 확인하는 함수
const isTokenReissueRequest = (config: InternalAxiosRequestConfig): boolean => {
  // reissueToken API의 URL 패턴을 확인 (실제 API 경로에 맞게 수정 필요)
  return config.url?.includes('reissue') || false;
};

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: API_V2_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터
const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  if (typeof window === 'undefined') {
    const getRequestStorage = await import('../server/auth').then(
      (module) => module.getRequestStorage,
    );
    const requestStorage = getRequestStorage();
    if (!requestStorage) {
      return config;
    }
    const requestCookie = requestStorage.request.headers.get('Cookie');
    config.headers['Cookie'] = requestCookie;
  }
  return config;
};

// 응답 인터셉터
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// 에러 응답 인터셉터 (토큰 재발급 로직 포함)
const responseErrorInterceptor = async (
  error: AxiosError,
): Promise<AxiosResponse> => {
  // 만약 서버에서 axios 에러가 발생한 경우는 스킵
  if (typeof window === 'undefined') {
    return Promise.reject(error);
  }
  const originalRequest = error.config;

  // 원래 요청이 없거나 토큰 재발급 요청에서 에러가 발생한 경우
  if (!originalRequest || isTokenReissueRequest(originalRequest)) {
    return Promise.reject(error);
  }

  // 401 에러이고 아직 재시도하지 않은 요청인 경우
  if (isTokenExpiredError(error) && !originalRequest._retry) {
    // 재시도 플래그 설정
    originalRequest._retry = true;

    // 이미 토큰 재발급이 진행 중인 경우
    if (tokenRefreshState.isRefreshing) {
      // 대기열에 추가하고 토큰 재발급 완료를 기다림
      return new Promise((resolve, reject) => {
        tokenRefreshState.failedQueue.push({ resolve, reject });
      })
        .then(() => {
          // 토큰 재발급이 완료되면 원래 요청 재시도
          return axiosInstance(originalRequest);
        })
        .catch((err: Error) => {
          return Promise.reject(err);
        });
    }

    // 토큰 재발급 시작
    tokenRefreshState.isRefreshing = true;

    try {
      // 토큰 재발급 API 호출
      await reissueToken();

      // 재발급 성공 시 대기 중인 요청들 처리
      processQueue(null, 'success');

      // 원래 요청 재시도
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // 재발급 실패 시 대기 중인 요청들에 에러 전파
      const error =
        refreshError instanceof Error
          ? refreshError
          : new Error('Token refresh failed');
      processQueue(error, null);

      // 로그인 페이지로 리다이렉트 또는 로그아웃 처리
      // 예: window.location.href = '/login';
      // 또는 로그아웃 함수 호출

      return Promise.reject(refreshError);
    } finally {
      // 토큰 재발급 상태 초기화
      tokenRefreshState.isRefreshing = false;
    }
  }

  return Promise.reject(error);
};

// 인터셉터 등록
axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);

// 타입 확장 (axios 설정에 _retry 속성 추가)
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
