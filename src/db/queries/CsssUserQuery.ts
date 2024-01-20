
import CsssUser,
{UserId, CsssUserInitializer, CsssUserMutator} from "../../types/public/CsssUser";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<CsssUser, CsssUserInitializer, CsssUserMutator, UserId> = {
	create(object: CsssUserInitializer): void {
		throw new Error("Method not implemented.");
	},

	read(userId: UserId): CsssUser {
		throw new Error("Method not implemented.");
	},

	// should we allow?
	readAll(): CsssUser[] {
		throw new Error("Method not implemented.");
	},

	update(userId: UserId, mutateObject: CsssUserMutator): void {
		throw new Error("Method not implemented.");
	},

	delete(userId: UserId): void {
		throw new Error("Method not implemented.");
	}
};

const csssUserQueries = {
	authenticateUser(email: string, password: string): CsssUser {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries,
	...csssUserQueries
};
