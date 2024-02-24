
import {FriendlyTransaction} from "../../types/DBTypes";
import Transaction,
{TransactionId, TransactionInitializer, TransactionMutator} from "../../types/db_internal/public/Transaction";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";
import TransactionItemQuery from "./TransactionItemQuery";

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

	public async create(object: TransactionInitializer): Promise<FriendlyTransaction> {
		return await this.getFriendlyTransaction(await super.create(object));
	}

	public async read(primaryKey: TransactionId): Promise<FriendlyTransaction> {
		return await this.getFriendlyTransaction(await super.read(primaryKey));
	}

	public async readAll(): Promise<Transaction[]> {
		const readAll = await super.readAll();
		return Promise.all(readAll.map(async (transaction) => this.getFriendlyTransaction(transaction)));
	}

	public async update(primaryKey: TransactionId, mutateObject: TransactionMutator): Promise<FriendlyTransaction> {
		return await this.getFriendlyTransaction(await super.update(primaryKey, mutateObject));
	}

	private async getFriendlyTransaction(transaction: Transaction): Promise<FriendlyTransaction> {
		if (!transaction) {
			return null;
		}
		const items = await TransactionItemQuery.readAllFromTransaction(transaction.transaction_id);
		return {
			...transaction,
			items: items.map((item) => {
				return {
					item_id: item.item_id,
					item_quantity: item.item_quantity
				};
			})
		};
	}
}

export default new TransactionQuery();
