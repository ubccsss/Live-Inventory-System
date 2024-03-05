
import ValidCategory,
{Category, ValidCategoryInitializer, ValidCategoryMutator} from "../../types/db_internal/public/ValidCategory";
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

	/**
	 * Updating is not allowed since category, which is the only row, is a primary key.
	 */
	public async update(primaryKey: Category, mutateObject: ValidCategoryMutator): Promise<null> {
		return null;
	}
}

export default new ValidCategoryQuery();
