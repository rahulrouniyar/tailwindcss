export * from './category';

export interface PaginatedResponse<T>{
  count: number;
  next: string | null;
  previous: string | null;
  results: T[] | undefined;
};
