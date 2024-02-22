
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
}

export default new ValidCategoryQuery();
