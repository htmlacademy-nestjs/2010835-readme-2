export interface CRUDRepositoryInterface<T1, T2, R> {
  findById(id: T2): Promise<R | null>;
  create(item: T1): Promise<R>;
  update(id: T2, item: T1): Promise<R>;
  destroy(id: T2): Promise<void>;
}
