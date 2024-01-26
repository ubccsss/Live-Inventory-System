
import Reimbursement,
{ReimbursementId, ReimbursementInitializer, ReimbursementMutator} from "../../types/public/Reimbursement";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<Reimbursement, ReimbursementInitializer, ReimbursementMutator, ReimbursementId> = {
	create(object: ReimbursementInitializer): void {
		throw new Error("Method not implemented.");
	},

	read(reimbursementId: ReimbursementId): Reimbursement {
		throw new Error("Method not implemented.");
	},

	readAll(): Reimbursement[] {
		throw new Error("Method not implemented.");
	},

	update(reimbursementId: ReimbursementId, mutateObject: ReimbursementMutator): void {
		throw new Error("Method not implemented.");
	},

	delete(reimbursementId: ReimbursementId): void {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries
};
