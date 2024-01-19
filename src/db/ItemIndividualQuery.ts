import ItemIndividual, {ItemId, ItemIndividualInitializer, ItemIndividualMutator} from "../types/public/ItemIndividual";
import {Category} from "../types/public/ValidCategory";
import {SimpleCrudQueryable} from "./Queries";

const simpleCrudQueries:
SimpleCrudQueryable<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId> = {
	create(object: ItemIndividualInitializer): void {
		throw new Error("Method not implemented.");
	},

	read(primaryKey: ItemId): ItemIndividual {
		throw new Error("Method not implemented.");
	},

	readAll(): ItemIndividual[] {
		throw new Error("Method not implemented.");
	},

	update(primaryKey: ItemId, mutateProps: ItemIndividualMutator): void {
		throw new Error("Method not implemented.");
	},

	delete(primaryKey: ItemId): void {
		throw new Error("Method not implemented.");
	}
};

const itemIndividualQueries = {
	readAllFromCategory(category: Category): ItemIndividual {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries,
	...itemIndividualQueries
};
