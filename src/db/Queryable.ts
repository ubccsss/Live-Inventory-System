export interface SimpleCrudQueryable<T, TInit, TMut, PK> {
  create(object: TInit): void;
  read(primaryKey: PK): T;
  readAll(): T[];
  update(primaryKey: PK, mutateProps: TMut): void;
  delete(primaryKey: PK): void;
}

export interface CompositeCrudQueryable<T, TInit, TMut, PK1, PK2> {
  create(object: TInit): void;
  read(pk1: PK1, pk2: PK2): T;
  readAll(): T[];
  update(pk1: PK1, pk2: PK2, mutateObject: TMut): void;
  delete(pk1: PK1, pk2: PK2): void;
}
