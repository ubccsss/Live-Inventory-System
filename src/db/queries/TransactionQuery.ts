
import Transaction, {TransactionId, TransactionInitializer, TransactionMutator} from "../../types/public/Transaction";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<Transaction, TransactionInitializer, TransactionMutator, TransactionId> = {
	create(object: TransactionInitializer): void {
		throw new Error("Method not implemented.");
	},

	read(transactionId: TransactionId): Transaction {
		throw new Error("Method not implemented.");
	},

	readAll(): Transaction[] {
		throw new Error("Method not implemented.");
	},

	update(transactionId: TransactionId, mutateObject: TransactionMutator): void {
		throw new Error("Method not implemented.");
	},

	delete(transactionId: TransactionId): void {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries
};
