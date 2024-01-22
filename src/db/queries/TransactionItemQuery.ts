import {ItemId} from "../../types/public/ItemIndividual";
import {TransactionId} from "../../types/public/Transaction";
import TransactionItem,
{TransactionItemInitializer, TransactionItemMutator} from "../../types/public/TransactionItem";
import {CompositeCrudQueryable} from "../Queryable";

const compositeCrudQueries:
	CompositeCrudQueryable<TransactionItem,
		TransactionItemInitializer,
		TransactionItemMutator,
		TransactionId,
		ItemId>
= {
	create(object: TransactionItemInitializer): void {
		throw new Error("Method not implemented.");
	},

	read(transactionId: TransactionId, itemId: ItemId): TransactionItem {
		throw new Error("Method not implemented.");
	},

	readAll(): TransactionItem[] {
		throw new Error("Method not implemented.");
	},

	update(transactionId: TransactionId, itemId: ItemId, mutateObject: TransactionItemMutator): void {
		throw new Error("Method not implemented.");
	},

	delete(transactionId: TransactionId, itemId: ItemId): void {
		throw new Error("Method not implemented.");
	}
};

const transactionItemQueries = {
	/**
	 * Searches in the table for all TransactionItems that are linked to a particular item.
	 * @param itemId Foreign key of item to search for
	 * @returns Array of TransactionItems linked to the given itemId
	 */
	readAllFromItem(itemId: ItemId): TransactionItem[] {
		throw new Error("Method not implemented.");
	},

	/**
	 * Searches in the table for all TransactionItems that are linked to a particular transaction.
	 * @param transactionId Foreign key of transaction to search for
	 * @returns Array of TransactionItems linked to the given transactionId
	 */
	readAllFromTransaction(transactionId: TransactionId): TransactionItem[] {
		throw new Error("Method not implemented.");
	}
};

export default {
	...compositeCrudQueries,
	...transactionItemQueries
};
