export interface SwapiResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
