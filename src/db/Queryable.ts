export interface SimpleCrudQueryable<T, TInit, TMut, PK> {
  /**
   * Creates a new entry for the given object in the database.
   * @param object Initializer of the object
   * @returns Promise resolving to the given initialized object if successful
   */
  create(object: TInit): Promise<T>;

  /**
   * Reads the database and returns the object with the given primary key.
   * @param primaryKey Primary key of the object
   * @returns Promise resolving to object with given primary key, or null if no object is found
   */
  read(primaryKey: PK): Promise<T>;

  /**
   * Reads the database for all entries of the object.
   * @returns Promise resolving to all entries of the object in its table in the database
   */
  readAll(): Promise<T[]>;

  /**
   * Updates an existing object with the given primary key.
   * @param primaryKey Primary key of the object
   * @param mutateProps Mutator of the object containing desired new properties
   * @param returnUpdated Whether the function should return the updated object
   * @returns The updated object if returnUpdated is true, or nothing otherwise
   */
  update(primaryKey: PK, mutateProps: TMut, returnUpdated?: boolean): Promise<T|void>;

  /**
   * Deletes the object in the database with the given primary key.
   * @param primaryKey Primary key of the object
   */
  delete(primaryKey: PK): Promise<void>;
}

export interface CompositeCrudQueryable<T, TInit, TMut, PK1, PK2> {
  /**
   * Creates a new entry for the given object in the database.
   * @param object Initializer of the object
   * @returns Promise resolving to the given initialized object if successful
   */
  create(object: TInit): Promise<T>;

  /**
   * Reads the database and returns the object with the given composite key.
   * @param pk1 First foreign key of the object that forms the composite key
   * @param pk2 Second foreign key of the object that forms the composite key
   * @returns Promise resolving to object with given composite key, or null if no object is found
   */
  read(pk1: PK1, pk2: PK2): Promise<T>;

  /**
   * Reads the database for all entries of the object.
   * @returns Promise resolving to all entries of the object in its table in the database
   */
  readAll(): Promise<T[]>;

  /**
   * Updates an existing object with the given composite key.
   * @param pk1 First foreign key of the object that forms the composite key
   * @param pk2 Second foreign key of the object that forms the composite key
   * @param mutateProps Mutator of the object containing desired new properties
   * @param returnUpdated Whether the function should return the updated object
   * @returns The updated object if returnUpdated is true, or nothing otherwise
   */
  update(pk1: PK1, pk2: PK2, mutateObject: TMut, returnUpdated?: boolean): Promise<T|void>;

  /**
   * Deletes the object in the database with the given composite key.
   * @param pk1 First foreign key of the object that forms the composite key
   * @param pk2 Second foreign key of the object that forms the composite key
   */
  delete(pk1: PK1, pk2: PK2): Promise<void>;
}
