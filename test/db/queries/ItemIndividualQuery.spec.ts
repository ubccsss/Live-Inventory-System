import {expect} from "chai";
import ItemIndividualQuery from "../../../src/db/queries/ItemIndividualQuery";
import {ItemIndividualInitializer, ItemIndividualMutator} from "../../../src/types/db/public/ItemIndividual";
import Dinero from "dinero.js";
import * as TestItems from "../test_objs/ItemIndividual";

const testItemInitializer: ItemIndividualInitializer = {
	name: "Welch's Fruit Snacks",
	description: "Made with real fruit",
	price: Dinero({amount: 75, currency: "CAD"}),
	category: "food",
	img_url: "url",
	reservable: false,
	quantity_remaining: 5,
	low_stock_threshold: 5,
	last_restocked: new Date("2024-01-24"),
	max_quantity_per_transaction: 2
};

describe("ItemIndividual Query Tests", () => {
	describe("create()", () => {
		it("creates basic item", async () => {
			const createdItem = await ItemIndividualQuery.create(testItemInitializer);
			expect(await ItemIndividualQuery.read(createdItem.item_id)).to.deep.equal(createdItem);
			expect(await ItemIndividualQuery.readAll()).to.deep.contain(createdItem);

			// cleanup
			await ItemIndividualQuery.delete(createdItem.item_id);
		});
	});

	describe("read()", () => {
		it("reads existing item", async () => {
			expect(await ItemIndividualQuery.read(TestItems.clifBar.item_id)).to.deep.equal(TestItems.clifBar);
		});
		it("returns null when reading nonexistent item", async () => {
			expect(await ItemIndividualQuery.read(-1)).to.be.null;
		});
	});

	describe("readAll()", () => {
		it("returns list of all items", async () => {
			const allItems = await ItemIndividualQuery.readAll();
			allItems.forEach((item) => expect(TestItems).to.deep.contain(item));
		});
	});

	describe("update()", () => {
		it("updates existing item", async () => {
			const createdItem = await ItemIndividualQuery.create(testItemInitializer);
			const itemMutator: ItemIndividualMutator = {
				price: Dinero({amount: 50, currency: "CAD"}),
				quantity_remaining: 25,
				last_restocked: new Date("2024-02-01"),
			};
			const mutatedItem = {...createdItem, ...itemMutator};
			expect(await ItemIndividualQuery.update(createdItem.item_id, itemMutator)).to.deep.equal(mutatedItem);
			expect(await ItemIndividualQuery.read(createdItem.item_id)).to.deep.equal(mutatedItem);

			// cleanup
			await ItemIndividualQuery.delete(createdItem.item_id);
		});
		it("returns null when updating nonexistent item", async () => {
			expect(await ItemIndividualQuery.update(-1, {})).to.be.null;
		});
		it("does not modify item if given empty mutator", async () => {
			const createdItem = await ItemIndividualQuery.create(testItemInitializer);
			expect(await ItemIndividualQuery.update(createdItem.item_id, {})).to.deep.equal(createdItem);

			// cleanup
			await ItemIndividualQuery.delete(createdItem.item_id);
		});
	});

	describe("delete()", () => {
		it("deletes existing item", async () => {
			const createdItem = await ItemIndividualQuery.create(testItemInitializer);
			expect(await ItemIndividualQuery.delete(createdItem.item_id)).to.be.true;
			expect(await ItemIndividualQuery.readAll()).to.not.deep.contain(createdItem);
		});
		it("returns false if deleting nonexistent item", async () => {
			expect(await ItemIndividualQuery.delete(-1)).to.be.false;
		});
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
