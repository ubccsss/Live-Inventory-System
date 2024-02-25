import {expect} from "chai";
import ItemIndividualQuery from "../../../src/db/queries/ItemIndividualQuery";
import {ItemIndividualInitializer, ItemIndividualMutator} from "../../../src/types/db_internal/public/ItemIndividual";
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

	const testLowStockItemInitializer: ItemIndividualInitializer = {
		name: "An entire pizza",
		description: "Contains real tomatoes",
		price: BigInt(1500),
		category: "food",
		img_url: "url",
		reservable: false,
		quantity_remaining: 1,
		low_stock_threshold: 5,
		last_restocked: new Date("2024-02-24T08:00:00.000Z"),
		max_quantity_per_transaction: 1
	};

	describe("readAllLowStock()", () => {
		it("returns an empty list if no items are at/below low stock threshold", async () => {
			expect(await ItemIndividualQuery.readAllLowStock()).to.be.empty;
		});
		it("returns an item right at the low stock threshold", async () => {
			const createdItem = await ItemIndividualQuery.create(testItemInitializer);
			try {
				expect(await ItemIndividualQuery.readAllLowStock()).to.have.deep.members([createdItem]);
			} finally {
				await ItemIndividualQuery.delete(createdItem.item_id);
			}
		});
		it("returns an item below the low stock threshold", async () => {
			const createdItem = await ItemIndividualQuery.create(testLowStockItemInitializer);
			try {
				expect(await ItemIndividualQuery.readAllLowStock()).to.have.deep.members([createdItem]);
			} finally {
				await ItemIndividualQuery.delete(createdItem.item_id);
			}
		});
		it("returns all items at or below the low stock threshold", async () => {
			const createdItemOne = await ItemIndividualQuery.create(testItemInitializer);
			const createdItemTwo = await ItemIndividualQuery.create(testLowStockItemInitializer);
			try {
				expect(await ItemIndividualQuery.readAllLowStock()).
					to.have.deep.members([createdItemOne, createdItemTwo]);
			} finally {
				await ItemIndividualQuery.delete(createdItemOne.item_id);
				await ItemIndividualQuery.delete(createdItemTwo.item_id);
			}
		});
	});
});
