export interface APIResponse<T> {
  code: number;
  message: string;
  isSuccess: boolean;
  result: T;
}

export interface CursorPaginationResult {
  nextCursor: number;
  size: number;
  hasNext: boolean;
}
