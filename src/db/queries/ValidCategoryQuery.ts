
import ValidCategory,
{Category, ValidCategoryInitializer, ValidCategoryMutator} from "../../types/db/public/ValidCategory";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";

const tableName = "valid_category";
const pkName = "category";

class ValidCategoryQuery extends SimpleCrudQueryable<
	ValidCategory,
	ValidCategoryInitializer,
	ValidCategoryMutator,
	Category
> {
	constructor() {
		super(tableName, pkName);
	}

	// Do not allow updating since category is a primary key
	public update = async (primaryKey: Category, mutateObject: ValidCategoryMutator): Promise<ValidCategory> => {
		return null;
	};
}

export default new ValidCategoryQuery();
