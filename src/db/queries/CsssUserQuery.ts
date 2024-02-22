
import CsssUser,
{UserId, CsssUserInitializer, CsssUserMutator} from "../../types/db/public/CsssUser";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";

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
		throw new Error("Method not implemented.");
	};
}

export default new CsssUserQuery();
