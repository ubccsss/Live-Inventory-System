
import CsssUser,
{UserId, CsssUserInitializer, CsssUserMutator} from "../../types/db/public/CsssUser";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";
import * as DB from "../../db/DB";

const tableName = "csss_user";
const pkName = "user_id";

class CsssUserQuery extends SimpleCrudQueryable<CsssUser, CsssUserInitializer, CsssUserMutator, UserId>  {
	constructor() {
		super(tableName, pkName);
	}

	/**
	 * Tries to authenticate the user with the given credentials.
	 * @param email Email of the given user
	 * @param password Password hash of the given user
	 * @returns Promise resolving to the CsssUser with the given credentials, or null if no user found
	 */
	public authenticateUser = async (email: string, password: string): Promise<CsssUser> => {
		const queryResponse = await DB.query(
			`SELECT * FROM ${this.tableName} WHERE email=$1 AND password=$2`,
			[email, password]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	};
}

export default new CsssUserQuery();
