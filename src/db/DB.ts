import {Pool} from "pg";
import type {QueryResult} from "pg";

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DB,
});

pool.on("error", (err, client) => {
	console.log(`Client in pool experienced error: ${err}`);
});

export const query = async (text: string, params: any[]): Promise<QueryResult<any>> => {
	return await pool.query(text, params);
};

export const checkoutClient = async () => {
	return await pool.connect();
};
