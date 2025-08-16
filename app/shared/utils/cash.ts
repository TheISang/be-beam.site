export const formatNumberWithComma = (value: number | string): string => {
  const num = typeof value === 'string' ? Number(value) : value;

  if (isNaN(num)) return '0';
  return new Intl.NumberFormat('ko-KR').format(num); // 예: 26,704
};
