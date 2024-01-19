export interface SimpleCrudQueryable<T, TInit, TMut, PK> {
  create(object: TInit): void;
  read(primaryKey: PK): T;
  readAll(): T[];
  update(primaryKey: PK, mutateProps: TMut): void;
  delete(primaryKey: PK): void;
}

export interface CompositeCrudQueryable<T, TInit, TMut, PK> {
  create(object: TInit): void;
  readAll(): T[];
  update(primaryKey: PK, mutateProps: TMut): void;
  delete(primaryKey: PK): void;
}
