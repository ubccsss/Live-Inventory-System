import ItemIndividual,
{ItemId, ItemIndividualInitializer, ItemIndividualMutator} from "../../types/db/public/ItemIndividual";
import {Category} from "../../types/db/public/ValidCategory";
import {
	SimpleCrudQueryable,
	simpleCreate,
	simpleRead,
	simpleReadAll,
	simpleUpdate,
	simpleDelete
} from "../SimpleCrudQueryable";
import * as DB from "../../db/DB";

const tableName = "item_individual";
const pkName = "item_id";

const simpleCrudQueries:
SimpleCrudQueryable<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId> = {
	async create(object: ItemIndividualInitializer): Promise<ItemIndividual> {
		return simpleCreate<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId>(
			object,
			tableName
		);
	},

	async read(itemId: ItemId): Promise<ItemIndividual> {
		return simpleRead<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId>(itemId, tableName);
	},

	async readAll(): Promise<ItemIndividual[]> {
		return simpleReadAll<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId>(tableName);
	},

	async update(itemId: ItemId, mutateObject: ItemIndividualMutator): Promise<ItemIndividual> {
		return simpleUpdate<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId>(
			itemId,
			mutateObject,
			tableName,
			pkName
		);
	},

	async delete(itemId: ItemId): Promise<boolean> {
		return simpleDelete<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId>(
			itemId,
			tableName,
			pkName
		);
	}
};

const itemIndividualQueries = {
	/**
	 * Searches for all items that have the specified category.
	 * @param category Category to search within
	 * @returns Promise resolving to all items in the table with the specified category
	 */
	async readAllFromCategory(category: Category): Promise<ItemIndividual[]> {
		const queryResponse = await DB.query(
			"SELECT * FROM item_individual WHERE category=$1",
			[category]
		);
		return queryResponse.rows;
	}
};

export default {
	...simpleCrudQueries,
	...itemIndividualQueries
};
