export interface DeatultResponse<T> {
  result: 'Success' | 'Fail';
  data: T;
}
