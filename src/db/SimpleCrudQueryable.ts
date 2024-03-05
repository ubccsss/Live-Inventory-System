import * as DB from "../db/DB";

export class SimpleCrudQueryable<T, TInit, TMut, PK> {
	protected tableName: string;
	protected pkName: string;

	constructor(tableName: string, pkName: string) {
		this.tableName = tableName;
		this.pkName = pkName;
	}

	/**
	 * Creates a new entry for the given object in the database.
	 * @param object Initializer of the object
	 * @returns Promise resolving to the given initialized object if successful
	 */
	public async create(object: TInit): Promise<T> {
		// Object.keys and Object.values return things in the same order so this is safe
		const keys = Object.keys(object);
		const values = Object.values(object);

		const queryResponse = await DB.query(
			`INSERT INTO ${this.tableName} (${keys.join(",")})` +
			`VALUES (${keys.map((prop, i) => `$${i + 1}`).join(",")})` +
			"RETURNING *",
			values
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	}

	/**
	 * Reads the database and returns the object with the given primary key.
	 * @param primaryKey Primary key of the object
	 * @returns Promise resolving to object with given primary key, or null if no object is found
	 */
	public async read(primaryKey: PK): Promise<T> {
		const queryResponse = await DB.query(
			`SELECT * FROM ${this.tableName} WHERE ${this.pkName}=$1`,
			[primaryKey]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	}

	/**
	 * Reads the database for all entries of the object.
	 * @returns Promise resolving to all entries of the object in its table in the database
	 */
	public async readAll(): Promise<T[]> {
		const queryResponse = await DB.query(`SELECT * FROM ${this.tableName}`);
		return queryResponse.rows;
	}

	/**
	 * Updates an existing object with the given primary key.
	 * @param primaryKey Primary key of the object
	 * @param mutateProps Mutator of the object containing desired new properties
	 * @returns Promise resolving to the updated object, or null if no object is found
	 */
	public async update(primaryKey: PK, mutateObject: TMut): Promise<T> {
		if (Object.keys(mutateObject).length === 0) {
			return null;
		}

		// Use i+2 for parameter so that $1 is reserved for the item id
		const keys = Object.keys(mutateObject).map((prop, i) => `${prop}=$${i + 2}`);
		const queryResponse = await DB.query(
			`UPDATE ${this.tableName} SET ${keys.join(",")} WHERE ${this.pkName}=$1 RETURNING *`,
			[primaryKey, ...Object.values(mutateObject)]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	}

	/**
	 * Deletes the object in the database with the given primary key.
	 * @param primaryKey Primary key of the object
	 * @returns Promise resolving to boolean indicating whether any rows were deleted
	 */
	public async delete(primaryKey: PK): Promise<boolean> {
		const queryResponse = await DB.query(
			`DELETE FROM ${this.tableName} WHERE ${this.pkName}=$1`,
			[primaryKey]
		);
		return queryResponse.rowCount === 1;
	}
}
