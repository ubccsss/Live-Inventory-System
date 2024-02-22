
import Transaction,
{TransactionId, TransactionInitializer, TransactionMutator} from "../../types/db/public/Transaction";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";

const simpleCrudQueries:
SimpleCrudQueryable<Transaction, TransactionInitializer, TransactionMutator, TransactionId> = {
	async create(object: TransactionInitializer): Promise<Transaction> {
		throw new Error("Method not implemented.");
	},

	async read(transactionId: TransactionId): Promise<Transaction> {
		throw new Error("Method not implemented.");
	},

	async readAll(): Promise<Transaction[]> {
		throw new Error("Method not implemented.");
	},

	async update(transactionId: TransactionId, mutateObject: TransactionMutator): Promise<Transaction> {
		throw new Error("Method not implemented.");
	},

	async delete(transactionId: TransactionId): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries
};
