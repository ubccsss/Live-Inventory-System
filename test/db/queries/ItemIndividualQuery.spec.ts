import {expect} from "chai";
import ItemIndividualQuery from "../../../src/db/queries/ItemIndividualQuery";
import {ItemIndividualInitializer, ItemIndividualMutator} from "../../../src/types/db/public/ItemIndividual";
import * as TestItems from "../test_objs/ItemIndividual";
import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./SimpleCrudQueryable";

const testItemInitializer: ItemIndividualInitializer = {
	name: "Welch's Fruit Snacks",
	description: "Made with real fruit",
	price: BigInt(75),
	category: "food",
	img_url: "url",
	reservable: false,
	quantity_remaining: 5,
	low_stock_threshold: 5,
	last_restocked: new Date("2024-01-24T08:00:00.000Z"),
	max_quantity_per_transaction: 2
};

describe("ItemIndividual Query Tests", () => {

	testCreate(ItemIndividualQuery, {
		testInitializer: testItemInitializer,
		getId: (q) => q.item_id
	});

	testRead(ItemIndividualQuery, {
		testId: TestItems.clifBar.item_id,
		testQueryable: TestItems.clifBar,
		nonexistentId: -1
	});

	testReadAll(ItemIndividualQuery, Object.values(TestItems));

	const itemMutator: ItemIndividualMutator = {
		price: BigInt(50),
		quantity_remaining: 25,
		last_restocked: new Date("2024-02-01T08:00:00.000Z"),
	};
	testUpdate(ItemIndividualQuery, {
		testInitializer: testItemInitializer,
		testMutator: itemMutator,
		nonexistentId: -1,
		getId: (q) => q.item_id
	});

	testDelete(ItemIndividualQuery, {
		testInitializer: testItemInitializer,
		nonexistentId: -1,
		getId: (q) => q.item_id
	});

	describe("readAllFromCategory()", () => {
		it("returns array containing all items in category", async () => {
			expect(await ItemIndividualQuery.readAllFromCategory("food")).
				to.have.deep.members([TestItems.clifBar, TestItems.shinRamen]);
			expect(await ItemIndividualQuery.readAllFromCategory("drink")).to.have.deep.members([TestItems.cocaCola]);
		});
		it("returns empty array if category has no items", async () => {
			expect(await ItemIndividualQuery.readAllFromCategory("merch")).to.be.empty;
		});
		it("returns empty array if category is invalid", async () => {
			expect(await ItemIndividualQuery.readAllFromCategory("fake")).to.be.empty;
		});
	});
});
