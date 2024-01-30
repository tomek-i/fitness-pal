export interface APIService<T> {
  ApiURL: string;

  Get(id: string): T;
  GetAll(): T[];

  Create(data: T): T;
  Update(data: T): boolean;
  Delete(id: string): boolean;
}
