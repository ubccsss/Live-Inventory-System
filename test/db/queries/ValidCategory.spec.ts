
import * as TestItems from "../test_objs/ValidCategory";
import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./SimpleCrudQueryable";
import ValidCategoryQuery from "../../../src/db/queries/ValidCategoryQuery";
import {ValidCategoryInitializer, ValidCategoryMutator} from "../../../src/types/db/public/ValidCategory";

const testValidCategoryInitializer: ValidCategoryInitializer = {
	category: "category"
};

describe("ValidCategory Query Tests", () => {

	testCreate(ValidCategoryQuery, {
		testInitializer: testValidCategoryInitializer,
		getId: (q) => q.category
	});

	testRead(ValidCategoryQuery, {
		testId: TestItems.categoryDrink.category,
		testQueryable: TestItems.categoryDrink,
		nonexistentId: "fake"
	});

	testReadAll(ValidCategoryQuery, Object.values(TestItems));

	const validCategoryMutator: ValidCategoryMutator = {
		category: "wow"
	};
	testUpdate(ValidCategoryQuery, {
		testInitializer: testValidCategoryInitializer,
		testMutator: validCategoryMutator,
		nonexistentId: "fake",
		getId: (q) => q.category
	});

	testDelete(ValidCategoryQuery, {
		testInitializer: testValidCategoryInitializer,
		nonexistentId: "wow",
		getId: (q) => q.category
	});
});
