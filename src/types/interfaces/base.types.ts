export interface Repository<T, U> {
  create(data: U): Promise<T>
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
}
