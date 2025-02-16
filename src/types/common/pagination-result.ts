export interface PaginationResult<T> {
  count: number
  results: T[]
  next: string
}
