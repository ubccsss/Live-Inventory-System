
import Transaction,
{TransactionId, TransactionInitializer, TransactionMutator} from "../../types/db_internal/public/Transaction";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";

const tableName = "transaction";
const pkName = "transaction_id";

class TransactionQuery extends SimpleCrudQueryable<
	Transaction,
	TransactionInitializer,
	TransactionMutator,
	TransactionId
> {
	constructor() {
		super(tableName, pkName);
	}
}

export default new TransactionQuery();
