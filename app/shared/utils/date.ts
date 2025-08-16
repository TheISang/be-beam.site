/**
 * 날짜 문자열을 "MM월 DD일" 형식으로 변환합니다.
 * @param isoDate ISO 형식의 날짜 문자열 (예: "2024-10-15T15:00:00")
 * @returns "10월 15일" 형식의 문자열
 */
export const formatToMonthAndDayDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}월 ${day}일`;
};

export const extractTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
