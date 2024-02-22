import * as DB from "../db/DB";

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

export const simpleCreate = async<T, TInit, TMut, PK>(object: TInit, table: string): Promise<T> => {
	// Object.keys and Object.values return things in the same order so this is safe
	const keys = Object.keys(object);
	const values = Object.values(object);

	const queryResponse = await DB.query(
		`INSERT INTO ${table} (${keys.join(",")})` +
		`VALUES (${keys.map((prop, i) => `$${i + 1}`).join(",")})` +
		"RETURNING *",
		values
	);
	if (queryResponse.rows.length === 1) {
		return queryResponse.rows[0];
	} else {
		return null;
	}
};

export const simpleRead = async<T, TInit, TMut, PK>(pk: PK, table: string): Promise<T> => {
	const queryResponse = await DB.query(
		`SELECT * FROM ${table} WHERE item_id=$1`,
		[pk]
	);
	if(queryResponse.rows.length === 1) {
		return queryResponse.rows[0];
	} else {
		return null;
	}
};

export const simpleReadAll = async <T, TInit, TMut, PK>(table: string): Promise<T[]> => {
	const queryResponse = await DB.query(`SELECT * FROM ${table}`);
	return queryResponse.rows;
};

export const simpleUpdate = async <T, TInit, TMut, PK>(
	pk: PK, mutateObject: TMut,
	table: string,
	pkName: string
): Promise<T> => {
	if(Object.keys(mutateObject).length === 0) {
		return null;
	}

	// Use i+2 for parameter so that $1 is reserved for the item id
	const keys = Object.keys(mutateObject).map((prop, i) => `${prop}=$${i + 2}`);
	const queryResponse = await DB.query(
		`UPDATE ${table} SET ${keys.join(",")} WHERE ${pkName}=$1 RETURNING *`,
		[pk, ...Object.values(mutateObject)]
	);
	if (queryResponse.rows.length === 1) {
		return queryResponse.rows[0];
	} else {
		return null;
	}
};

export const simpleDelete = async <T, TInit, TMut, PK>(pk: PK, table: string, pkName: string): Promise<boolean> => {
	const queryResponse = await DB.query(
		`DELETE FROM ${table} WHERE ${pkName}=$1`,
		[pk]
	);
	return queryResponse.rowCount === 1;
};
