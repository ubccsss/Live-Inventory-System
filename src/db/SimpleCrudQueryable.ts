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
   * @returns Promise resolving to the updated object, or null if no object is found
   */
  update(primaryKey: PK, mutateProps: TMut): Promise<T>;

  /**
   * Deletes the object in the database with the given primary key.
   * @param primaryKey Primary key of the object
   * @returns Promise resolving to boolean indicating whether any rows were deleted
   */
  delete(primaryKey: PK): Promise<boolean>;
}


