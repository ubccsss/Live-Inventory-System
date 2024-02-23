import ItemBoxQuery from "../../../src/db/queries/ItemBoxQuery";
import * as TestItems from "../test_objs/ItemBox";
import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./SimpleCrudQueryable";
import {ItemBoxInitializer, ItemBoxMutator} from "../../../src/types/db_internal/public/ItemBox";

const testItemBoxInitializer: ItemBoxInitializer = {
	item_id: 3,
	quantity_per_box: 6
};

describe("ItemBox Query Tests", () => {

	testCreate(ItemBoxQuery, {
		testInitializer: testItemBoxInitializer,
		getId: (q) => q.item_box_id
	});

	testRead(ItemBoxQuery, {
		testId: TestItems.itemBoxClifBar.item_box_id,
		testQueryable: TestItems.itemBoxClifBar,
		nonexistentId: -1
	});

	testReadAll(ItemBoxQuery, Object.values(TestItems));

	const itemBoxMutator: ItemBoxMutator = {
		quantity_per_box: 10
	};
	testUpdate(ItemBoxQuery, {
		testInitializer: testItemBoxInitializer,
		testMutator: itemBoxMutator,
		nonexistentId: -1,
		getId: (q) => q.item_box_id
	});

	testDelete(ItemBoxQuery, {
		testInitializer: testItemBoxInitializer,
		nonexistentId: -1,
		getId: (q) => q.item_box_id
	});
});
