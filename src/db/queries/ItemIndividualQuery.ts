import ItemIndividual,
{ItemId, ItemIndividualInitializer, ItemIndividualMutator} from "../../types/db_internal/public/ItemIndividual";
import {Category} from "../../types/db_internal/public/ValidCategory";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";
import * as DB from "../../db/DB";

const tableName = "item_individual";
const pkName = "item_id";

class ItemIndividualQuery extends SimpleCrudQueryable<
	ItemIndividual,
	ItemIndividualInitializer,
	ItemIndividualMutator,
	ItemId
> {
	constructor() {
		super(tableName, pkName);
	}

	/**
	 * Searches for all items that have the specified category.
	 * @param category Category to search within
	 * @returns Promise resolving to all items in the table with the specified category
	 */
	public async readAllFromCategory(category: Category): Promise<ItemIndividual[]> {
		const queryResponse = await DB.query(
			"SELECT * FROM item_individual WHERE category=$1",
			[category]
		);
		return queryResponse.rows;
	}

	/**
	 * Searches for all items whose quantities are at or less than the low stock threshold.
	 * @returns Promise resolving to all items in the table that need to be restocked
	 */
	public async readAllLowStock(): Promise<ItemIndividual[]> {
		const queryResponse = await DB.query(
			"SELECT * FROM item_individual WHERE quantity_remaining <= low_stock_threshold");
		return queryResponse.rows;
	}

}

export default new ItemIndividualQuery();
