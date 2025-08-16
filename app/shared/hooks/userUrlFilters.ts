import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { z } from 'zod';

// Hook 옵션 타입 정의
interface UseUrlFiltersOptions {
  /** URL 히스토리 업데이트 방식 (기본값: 'replace') */
  historyMode?: 'push' | 'replace';
}

// Hook 반환 타입 정의
interface UseUrlFiltersReturn<T> {
  /** 현재 필터 값들 */
  filters: T;

  /** 필터 업데이트 함수 */
  setFilter: (filters: Partial<T>) => void;
}

/**
 * URL 검색 파라미터와 동기화되는 필터/정렬 상태를 관리하는 Hook
 *
 * @template T - Zod 스키마에서 추론된 타입
 * @param schema - 필터 검증을 위한 Zod 스키마
 * @param defaultValues - 필터의 기본값
 * @param options - Hook 동작 옵션
 * @returns 필터 상태와 업데이트 함수들
 *
 * @example
 * ```typescript
 * const FilterSchema = z.object({
 *   search: z.string().default(''),
 *   category: z.string().default('all'),
 *   sortBy: z.enum(['name', 'date', 'price']).default('name'),
 *   sortOrder: z.enum(['asc', 'desc']).default('asc'),
 *   page: z.coerce.number().min(1).default(1),
 * });
 *
 * const { filters } = useUrlFilters(FilterSchema);
 * ```
 */
export function useUrlFilters<T extends z.ZodSchema>(
  schema: T,
  defaultValues: z.infer<T> = schema.parse({}),
  options: UseUrlFiltersOptions = { historyMode: 'replace' },
): UseUrlFiltersReturn<z.infer<T>> {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return schema.parse({
      ...defaultValues,
      ...Object.fromEntries(searchParams.entries()),
    });
  }, [searchParams, defaultValues, schema]);

  const setFilter = useCallback(
    (newFilters: Partial<z.infer<T>>) => {
      const updatedFilters = schema.parse({
        ...filters,
        ...newFilters,
      });
      setSearchParams(
        Object.entries(updatedFilters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc.set(key, value.toString());
          }
          return acc;
        }, new URLSearchParams()),
        {
          replace: options?.historyMode === 'replace',
        },
      );
    },
    [filters, schema, setSearchParams, options],
  );

  return {
    filters,
    setFilter,
  };
}
