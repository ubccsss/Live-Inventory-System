import ItemIndividual,
{ItemId, ItemIndividualInitializer, ItemIndividualMutator} from "../../types/public/ItemIndividual";
import {Category} from "../../types/public/ValidCategory";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId> = {
	async create(object: ItemIndividualInitializer): Promise<ItemIndividual> {
		throw new Error("Method not implemented.");
	},

	async read(itemId: ItemId): Promise<ItemIndividual> {
		throw new Error("Method not implemented.");
	},

	async readAll(): Promise<ItemIndividual[]> {
		throw new Error("Method not implemented.");
	},

	async update(itemId: ItemId, mutateObject: ItemIndividualMutator): Promise<void> {
		throw new Error("Method not implemented.");
	},

	async delete(itemId: ItemId): Promise<void> {
		throw new Error("Method not implemented.");
	}
};

const itemIndividualQueries = {
	/**
	 * Searches for all items that have the specified category.
	 * @param category Category to search within
	 * @returns Promise resolving to all items in the table with the specified category
	 */
	async readAllFromCategory(category: Category): Promise<ItemIndividual> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries,
	...itemIndividualQueries
};
