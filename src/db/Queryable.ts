export interface SimpleCrudQueryable<T, TInit, TMut, PK> {
  /**
   * Creates a new entry for the given object in the database.
   * @param object Initializer of the object
   */
  create(object: TInit): void;

  /**
   * Reads the database and returns the object with the given primary key.
   * @param primaryKey Primary key of the object
   * @returns Object with given primary key, or null if no object is found
   */
  read(primaryKey: PK): T;

  /**
   * Reads the database for all entries of the object.
   * @returns All entries of the object in its table in the database
   */
  readAll(): T[];

  /**
   * Updates an existing object with the given primary key.
   * @param primaryKey Primary key of the object
   * @param mutateProps Mutator of the object containing desired new properties
   */
  update(primaryKey: PK, mutateProps: TMut): void;

  /**
   * Deletes the object in the database with the given primary key.
   * @param primaryKey Primary key of the object
   */
  delete(primaryKey: PK): void;
}

export interface CompositeCrudQueryable<T, TInit, TMut, PK1, PK2> {
  /**
   * Creates a new entry for the given object in the database.
   * @param object Initializer of the object
   */
  create(object: TInit): void;

  /**
   * Reads the database and returns the object with the given composite key.
   * @param pk1 First foreign key of the object that forms the composite key
   * @param pk2 Second foreign key of the object that forms the composite key
   * @returns Object with given composite key, or null if no object is found
   */
  read(pk1: PK1, pk2: PK2): T;

  /**
   * Reads the database for all entries of the object.
   * @returns All entries of the object in its table in the database
   */
  readAll(): T[];

  /**
   * Updates an existing object with the given composite key.
   * @param pk1 First foreign key of the object that forms the composite key
   * @param pk2 Second foreign key of the object that forms the composite key
   * @param mutateProps Mutator of the object containing desired new properties
   */
  update(pk1: PK1, pk2: PK2, mutateObject: TMut): void;

  /**
   * Deletes the object in the database with the given composite key.
   * @param pk1 First foreign key of the object that forms the composite key
   * @param pk2 Second foreign key of the object that forms the composite key
   */
  delete(pk1: PK1, pk2: PK2): void;
}