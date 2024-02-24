
import CsssUser,
{UserId, CsssUserInitializer, CsssUserMutator} from "../../types/db_internal/public/CsssUser";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";
import * as DB from "../../db/DB";
import {FriendlyCsssUser} from "../../types/DBTypes";

const tableName = "csss_user";
const pkName = "user_id";

class InternalCsssUserQuery
	extends SimpleCrudQueryable<CsssUser, CsssUserInitializer, CsssUserMutator, UserId> {

	constructor() {
		super(tableName, pkName);
	}
}

const internalCsss = new InternalCsssUserQuery();

class CsssUserQuery extends SimpleCrudQueryable<FriendlyCsssUser, CsssUserInitializer, CsssUserMutator, UserId>  {
	constructor() {
		super(tableName, pkName);
	}

	public async create(object: CsssUserInitializer): Promise<FriendlyCsssUser> {
		const createObj = await internalCsss.create(object);
		if (createObj) {
			delete createObj.password;
		}
		return createObj;
	}

	public async read(primaryKey: UserId): Promise<FriendlyCsssUser> {
		const readObj = await internalCsss.read(primaryKey);
		if (readObj) {
			delete readObj.password;
		}
		return readObj;
	}

	public async readAll(): Promise<FriendlyCsssUser[]> {
		const readObjs = await internalCsss.readAll();
		readObjs.forEach((obj) => delete obj.password);
		return readObjs;
	}

	public async update(primaryKey: UserId, mutateObject: CsssUserMutator): Promise<FriendlyCsssUser> {
		const updateObj = await internalCsss.update(primaryKey, mutateObject);
		if (updateObj) {
			delete updateObj.password;
		}
		return updateObj;
	}

	/**
	 * Tries to authenticate the user with the given credentials.
	 * @param email Email of the given user
	 * @param password Password hash of the given user
	 * @returns Promise resolving to the CsssUser with the given credentials, or null if no user found
	 */
	public authenticateUser = async (email: string, password: string): Promise<FriendlyCsssUser> => {
		const queryResponse = await DB.query(
			`SELECT * FROM ${this.tableName} WHERE email=$1 AND password=$2`,
			[email, password]
		);
		if (queryResponse.rows.length === 1) {
			const user = queryResponse.rows[0];
			delete user.password;
			return user;
		} else {
			return null;
		}
	};

	public resetPassword = async (email: string, newPassword: string): Promise<CsssUser> => {
		const queryResponse = await DB.query(
			`UPDATE ${this.tableName} SET password=$2 WHERE email=$1`,
			[email, newPassword]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	};
}

export default new CsssUserQuery();
