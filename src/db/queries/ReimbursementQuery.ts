
import Reimbursement,
{ReimbursementId, ReimbursementInitializer, ReimbursementMutator} from "../../types/db/public/Reimbursement";
import {SimpleCrudQueryable} from "../Queryable";

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

	async update(reimbursementId: ReimbursementId, mutateObject: ReimbursementMutator, returnUpdated = false):
	Promise<Reimbursement|void> {
		throw new Error("Method not implemented.");
	},

	async delete(reimbursementId: ReimbursementId): Promise<void> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries
};
