import ItemIndividual,
{ItemId, ItemIndividualInitializer, ItemIndividualMutator} from "../../types/db/public/ItemIndividual";
import {Category} from "../../types/db/public/ValidCategory";
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
	public readAllFromCategory = async (category: Category): Promise<ItemIndividual[]> => {
		const queryResponse = await DB.query(
			"SELECT * FROM item_individual WHERE category=$1",
			[category]
		);
		return queryResponse.rows;
	};

}

export default new ItemIndividualQuery();
