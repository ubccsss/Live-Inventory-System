import ItemIndividual,
{ItemId, ItemIndividualInitializer, ItemIndividualMutator} from "../../types/public/ItemIndividual";
import {Category} from "../../types/public/ValidCategory";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId> = {
	create(object: ItemIndividualInitializer): void {
		throw new Error("Method not implemented.");
	},

	read(itemId: ItemId): ItemIndividual {
		throw new Error("Method not implemented.");
	},

	readAll(): ItemIndividual[] {
		throw new Error("Method not implemented.");
	},

	update(itemId: ItemId, mutateObject: ItemIndividualMutator): void {
		throw new Error("Method not implemented.");
	},

	delete(itemId: ItemId): void {
		throw new Error("Method not implemented.");
	}
};

const itemIndividualQueries = {
	/**
	 * Searches for all items that have the specified category.
	 * @param category Category to search within
	 * @returns All items in the table with the specified category
	 */
	readAllFromCategory(category: Category): ItemIndividual {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries,
	...itemIndividualQueries
};
