
import ItemBox, {ItemBoxId, ItemBoxInitializer, ItemBoxMutator} from "../../types/public/ItemBox";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<ItemBox, ItemBoxInitializer, ItemBoxMutator, ItemBoxId> = {
	create(object: ItemBoxInitializer): void {
		throw new Error("Method not implemented.");
	},

	read(itemBoxId: ItemBoxId): ItemBox {
		throw new Error("Method not implemented.");
	},

	readAll(): ItemBox[] {
		throw new Error("Method not implemented.");
	},

	update(itemBoxId: ItemBoxId, mutateObject: ItemBoxMutator): void {
		throw new Error("Method not implemented.");
	},

	delete(itemBoxId: ItemBoxId): void {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries
};
