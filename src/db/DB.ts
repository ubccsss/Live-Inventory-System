import {Pool} from "pg";
import type {QueryResult} from "pg";

export default class DB {
	private pool: Pool;

	constructor() {
		this.pool = new Pool();
	}

	public query(text: string, params: any[]): Promise<QueryResult> {
		return this.pool.query(text, params);
	}

}
