
import Reimbursement,
{ReimbursementId, ReimbursementInitializer, ReimbursementMutator} from "../../types/db/public/Reimbursement";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";

const simpleCrudQueries:
SimpleCrudQueryable<Reimbursement, ReimbursementInitializer, ReimbursementMutator, ReimbursementId> = {
	async create(object: ReimbursementInitializer): Promise<Reimbursement> {
		throw new Error("Method not implemented.");
	},

	async read(reimbursementId: ReimbursementId): Promise<Reimbursement> {
		throw new Error("Method not implemented.");
	},

	async readAll(): Promise<Reimbursement[]> {
		throw new Error("Method not implemented.");
	},

	async update(reimbursementId: ReimbursementId, mutateObject: ReimbursementMutator): Promise<Reimbursement> {
		throw new Error("Method not implemented.");
	},

	async delete(reimbursementId: ReimbursementId): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries
};
