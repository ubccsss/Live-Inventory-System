
import Reimbursement,
{ReimbursementId, ReimbursementInitializer, ReimbursementMutator} from "../../types/db/public/Reimbursement";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";

const tableName = "reimbursement";
const pkName = "reimbursement_id";

class ReimbursementQuery extends SimpleCrudQueryable<
	Reimbursement,
	ReimbursementInitializer,
	ReimbursementMutator,
	ReimbursementId
> {
	constructor() {
		super(tableName, pkName);
	}
}

export default new ReimbursementQuery();
