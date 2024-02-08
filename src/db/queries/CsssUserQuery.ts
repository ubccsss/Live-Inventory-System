
import CsssUser,
{UserId, CsssUserInitializer, CsssUserMutator} from "../../types/db/public/CsssUser";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<CsssUser, CsssUserInitializer, CsssUserMutator, UserId> = {
	async create(object: CsssUserInitializer): Promise<CsssUser> {
		throw new Error("Method not implemented.");
	},

	async read(userId: UserId): Promise<CsssUser> {
		throw new Error("Method not implemented.");
	},

	// should we allow?
	async readAll(): Promise<CsssUser[]> {
		throw new Error("Method not implemented.");
	},

	async update(userId: UserId, mutateObject: CsssUserMutator): Promise<CsssUser> {
		throw new Error("Method not implemented.");
	},

	async delete(userId: UserId): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
};

const csssUserQueries = {
	/**
	 * Tries to authenticate the user with the given credentials.
	 * @param email Email of the given user
	 * @param password Password hash of the given user
	 * @returns Promise resolving to the CsssUser with the given credentials, or null if no user found
	 */
	async authenticateUser(email: string, password: string): Promise<CsssUser> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries,
	...csssUserQueries
};
