
import * as TestItems from "../test_objs/ValidCategory";
import {testCreate, testDelete, testRead, testReadAll} from "./SimpleCrudQueryable";
import ValidCategoryQuery from "../../../src/db/queries/ValidCategoryQuery";
import {ValidCategoryInitializer, ValidCategoryMutator} from "../../../src/types/db/public/ValidCategory";
import {expect} from "chai";

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
	describe("update()", () => {
		it("cannot update existing category", async () => {
			expect(await ValidCategoryQuery.update(TestItems.categoryDrink.category, validCategoryMutator)).to.be.null;
		});
		it("returns null when updating nonexistent queryable", async () => {
			expect(await ValidCategoryQuery.update("fake", validCategoryMutator)).to.be.null;
		});
		it("returns null if given empty mutator", async () => {
			const createdItem = await ValidCategoryQuery.create(testValidCategoryInitializer);
			try {
				expect(await ValidCategoryQuery.update(createdItem.category, {})).to.be.null;
			} finally {
				// cleanup
				await ValidCategoryQuery.delete(createdItem.category);
			}
		});
	});

	testDelete(ValidCategoryQuery, {
		testInitializer: testValidCategoryInitializer,
		nonexistentId: "wow",
		getId: (q) => q.category
	});
});
