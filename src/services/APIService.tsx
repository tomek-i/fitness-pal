export interface APIService<T> {
  ApiURL: string;

  Get(id: string): Promise<T>;
  GetAll(): T[];

  Create(data: T): Promise<T>;
  Update(data: T): Promise<boolean>;
  Delete(id: string): Promise<boolean>;
}
