
import ItemBox, {ItemBoxId, ItemBoxInitializer, ItemBoxMutator} from "../../types/db/public/ItemBox";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<ItemBox, ItemBoxInitializer, ItemBoxMutator, ItemBoxId> = {
	async create(object: ItemBoxInitializer): Promise<ItemBox> {
		throw new Error("Method not implemented.");
	},

	async read(itemBoxId: ItemBoxId): Promise<ItemBox> {
		throw new Error("Method not implemented.");
	},

	async readAll(): Promise<ItemBox[]> {
		throw new Error("Method not implemented.");
	},

	async update(itemBoxId: ItemBoxId, mutateObject: ItemBoxMutator): Promise<ItemBox> {
		throw new Error("Method not implemented.");
	},

	async delete(itemBoxId: ItemBoxId): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries
};
