import * as DB from "../db/DB";

export class CompositeCrudQueryable<T, TInit, TMut, PK1, PK2> {
	#tableName: string;
	#pk1Name: string;
	#pk2Name: string;

	constructor(tableName: string, pk1Name: string, pk2Name: string) {
		this.#tableName = tableName;
		this.#pk1Name = pk1Name;
		this.#pk2Name = pk2Name;
	}

	/**
	 * Creates a new entry for the given object in the database.
	 * @param object Initializer of the object
	 * @returns Promise resolving to the given initialized object if successful
	 */
	public create = async (object: TInit): Promise<T> => {
		// Object.keys and Object.values return things in the same order so this is safe
		const keys = Object.keys(object);
		const values = Object.values(object);

		const queryResponse = await DB.query(
			`INSERT INTO ${this.#tableName} (${keys.join(",")})` +
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

	/**
	 * Reads the database and returns the object with the given composite key.
	 * @param pk1 First foreign key of the object that forms the composite key
	 * @param pk2 Second foreign key of the object that forms the composite key
	 * @returns Promise resolving to object with given composite key, or null if no object is found
	 */
	public read = async (pk1: PK1, pk2: PK2): Promise<T> => {
		const queryResponse = await DB.query(
			`SELECT * FROM ${this.#tableName} WHERE ${this.#pk1Name}=$1 AND ${this.#pk2Name}=$2`,
			[pk1, pk2]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	};

	/**
	 * Reads the database for all entries of the object.
	 * @returns Promise resolving to all entries of the object in its table in the database
	 */
	public readAll = async (): Promise<T[]> => {
		const queryResponse = await DB.query(`SELECT * FROM ${this.#tableName}`);
		return queryResponse.rows;
	};

	/**
	 * Updates an existing object with the given composite key.
	 * @param pk1 First foreign key of the object that forms the composite key
	 * @param pk2 Second foreign key of the object that forms the composite key
	 * @param mutateProps Mutator of the object containing desired new properties
	 * @returns Promise resolving to the updated object, or null if no object is found
	 */
	public update = async (pk1: PK1, pk2: PK2, mutateObject: TMut): Promise<T> => {
		if (Object.keys(mutateObject).length === 0) {
			return null;
		}

		// Use i+3 for parameter so that $1 and $2 are reserved for the PKs
		const keys = Object.keys(mutateObject).map((prop, i) => `${prop}=$${i + 3}`);
		const queryResponse = await DB.query(
			`UPDATE ${this.#tableName} SET ${keys.join(",")}` +
			` WHERE ${this.#pk1Name}=$1 AND ${this.#pk2Name}=$2 RETURNING *`,
			[pk1, pk2, ...Object.values(mutateObject)]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	};

	/**
	 * Deletes the object in the database with the given composite key.
	 * @param pk1 First foreign key of the object that forms the composite key
	 * @param pk2 Second foreign key of the object that forms the composite key
	 * @returns Promise resolving to boolean indicating whether any rows were deleted
	 */
	public delete = async (pk1: PK1, pk2: PK2): Promise<boolean> => {
		const queryResponse = await DB.query(
			`DELETE FROM ${this.#tableName} WHERE ${this.#pk1Name}=$1 AND ${this.#pk2Name}=$2`,
			[pk1, pk2]
		);
		return queryResponse.rowCount === 1;
	};
}
