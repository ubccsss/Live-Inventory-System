
import ValidCategory,
{Category, ValidCategoryInitializer, ValidCategoryMutator} from "../../types/db/public/ValidCategory";
import {SimpleCrudQueryable} from "../Queryable";

const simpleCrudQueries:
SimpleCrudQueryable<ValidCategory, ValidCategoryInitializer, ValidCategoryMutator, Category> = {
	async create(object: ValidCategoryInitializer): Promise<ValidCategory> {
		throw new Error("Method not implemented.");
	},

	async read(category: Category): Promise<ValidCategory> {
		throw new Error("Method not implemented.");
	},

	async readAll(): Promise<ValidCategory[]> {
		throw new Error("Method not implemented.");
	},

	async update(category: Category, mutateObject: ValidCategoryMutator): Promise<ValidCategory> {
		throw new Error("Method not implemented.");
	},

	async delete(category: Category): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...simpleCrudQueries
};
