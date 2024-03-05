
import ItemBox, {ItemBoxId, ItemBoxInitializer, ItemBoxMutator} from "../../types/db/public/ItemBox";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";

const tableName = "item_box";
const pkName = "item_box_id";

class ItemBoxQuery extends SimpleCrudQueryable<ItemBox, ItemBoxInitializer, ItemBoxMutator, ItemBoxId> {
	constructor() {
		super(tableName, pkName);
	}
}

export default new ItemBoxQuery();
