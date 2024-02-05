import {ItemId} from "../../types/db/public/ItemIndividual";
import {TransactionId} from "../../types/db/public/Transaction";
import TransactionItem,
{TransactionItemInitializer, TransactionItemMutator} from "../../types/db/public/TransactionItem";
import {CompositeCrudQueryable} from "../Queryable";

const compositeCrudQueries:
	CompositeCrudQueryable<TransactionItem,
		TransactionItemInitializer,
		TransactionItemMutator,
		TransactionId,
		ItemId>
= {
	async create(object: TransactionItemInitializer): Promise<TransactionItem> {
		throw new Error("Method not implemented.");
	},

	async read(transactionId: TransactionId, itemId: ItemId): Promise<TransactionItem> {
		throw new Error("Method not implemented.");
	},

	async readAll(): Promise<TransactionItem[]> {
		throw new Error("Method not implemented.");
	},

	async update(
		transactionId: TransactionId,
		itemId: ItemId,
		mutateObject: TransactionItemMutator,
		returnUpdated = false
	): Promise<TransactionItem|void> {
		throw new Error("Method not implemented.");
	},

	async delete(transactionId: TransactionId, itemId: ItemId): Promise<void> {
		throw new Error("Method not implemented.");
	}
};

const transactionItemQueries = {
	/**
	 * Searches in the table for all TransactionItems that are linked to a particular item.
	 * @param itemId Foreign key of item to search for
	 * @returns Promise resolving to array of TransactionItems linked to the given itemId
	 */
	async readAllFromItem(itemId: ItemId): Promise<TransactionItem[]> {
		throw new Error("Method not implemented.");
	},

	/**
	 * Searches in the table for all TransactionItems that are linked to a particular transaction.
	 * @param transactionId Foreign key of transaction to search for
	 * @returns Promise resolving to array of TransactionItems linked to the given transactionId
	 */
	async readAllFromTransaction(transactionId: TransactionId): Promise<TransactionItem[]> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...compositeCrudQueries,
	...transactionItemQueries
};
