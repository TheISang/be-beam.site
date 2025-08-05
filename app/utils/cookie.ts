import * as cookie from 'cookie';

export function convertSetCookieToCookieHeader(
  setCookieHeaders: string[] | undefined,
): string {
  if (!setCookieHeaders || setCookieHeaders.length === 0) {
    return '';
  }

  const cookiePairs: string[] = [];

  setCookieHeaders.forEach((setCookieString) => {
    if (!setCookieString) {
      return; // 빈 문자열 스킵
    }
    // 첫 번째 세미콜론(;) 이전의 '이름=값' 부분만 추출
    const nameValuePair = setCookieString.split(';')[0].trim();

    // '이름=값' 형식인지 간단히 확인 (최소한 '=' 포함)
    if (nameValuePair && nameValuePair.includes('=')) {
      cookiePairs.push(nameValuePair);
    }
  });

  // 추출된 모든 '이름=값' 쌍을 '; '로 연결하여 하나의 Cookie 헤더 문자열로 만듭니다.
  return cookiePairs.join('; ');
}

export function mergeCookies(
  cookies: string[] | undefined,
): string | undefined {
  if (!cookies || cookies.length === 0) {
    return undefined;
  }

  return cookies.join('; ');
}

// 문자열로된 쿠키를 키-값으로 파싱하고, 순서대로 합칩니다. 같은 키가 있을 경우 뒤에 있는 값으로 덮어쓰입니다. Set을 사용합니다.
export function mergeCookieHeaders(cookieHeaders: string[]): string {
  const cookieMap = new Map<string, string>();

  cookieHeaders.forEach((cookieString) => {
    const cookies = cookie.parse(cookieString);
    Object.keys(cookies).forEach((key) => {
      if (cookies[key]) {
        cookieMap.set(key, cookies[key]);
      }
    });
  });

  // 추출된 모든 '이름=값' 쌍을 '; '로 연결하여 하나의 Cookie 헤더 문자열로 만듭니다.
  return Array.from(cookieMap.entries())
    .map(([key, value]) => cookie.serialize(key, value))
    .join('; ');
}
