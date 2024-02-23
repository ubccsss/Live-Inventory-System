import {ItemId} from "../../types/db_internal/public/ItemIndividual";
import {TransactionId} from "../../types/db_internal/public/Transaction";
import TransactionItem,
{TransactionItemInitializer, TransactionItemMutator} from "../../types/db_internal/public/TransactionItem";
import {CompositeCrudQueryable} from "../CompositeCrudQueryable";
import * as DB from "../../db/DB";

const tableName = "transaction_item";
const pk1Name = "transaction_id";
const pk2Name = "item_id";

class TransactionItemQuery extends CompositeCrudQueryable<
	TransactionItem,
	TransactionItemInitializer,
	TransactionItemMutator,
	TransactionId,
	ItemId
> {
	constructor() {
		super(tableName, pk1Name, pk2Name);
	}

	/**
	 * Searches in the table for all TransactionItems that are linked to a particular item.
	 * @param itemId Foreign key of item to search for
	 * @returns Promise resolving to array of TransactionItems linked to the given itemId
	 */
	public readAllFromItem = async (itemId: ItemId): Promise<TransactionItem[]> => {
		const queryResponse = await DB.query(
			`SELECT * FROM ${this.tableName} WHERE ${this.pk2Name}=$1`,
			[itemId]
		);
		return queryResponse.rows;
	};

	/**
	 * Searches in the table for all TransactionItems that are linked to a particular transaction.
	 * @param transactionId Foreign key of transaction to search for
	 * @returns Promise resolving to array of TransactionItems linked to the given transactionId
	 */
	public readAllFromTransaction = async (transactionId: TransactionId): Promise<TransactionItem[]> => {
		const queryResponse = await DB.query(
			`SELECT * FROM ${this.tableName} WHERE ${this.pk1Name}=$1`,
			[transactionId]
		);
		return queryResponse.rows;
	};
}

export default new TransactionItemQuery();
