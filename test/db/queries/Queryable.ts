/* eslint-disable no-unused-expressions */
import {expect} from "chai";
import {SimpleCrudQueryable} from "../../../src/db/Queryable";

export const testCreate = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut, PK>,
	testProps: {
		testQueryableInitializer: TInit,
		getId: (q: T) => PK
	}
) => {
	const {testQueryableInitializer, getId} = testProps;
	describe("create()", () => {
		it("creates basic queryable", async () => {
			const createdItem = await Queryable.create(testQueryableInitializer);
			expect(await Queryable.read(getId(createdItem))).to.deep.equal(createdItem);
			expect(await Queryable.readAll()).to.deep.contain(createdItem);

			// cleanup
			await Queryable.delete(getId(createdItem));
		});
	});
};

export const testRead = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut, PK>,
	testProps: {
		testQueryableId: PK,
		testQueryable: T,
		nonexistentId: PK
	}
) => {
	const {testQueryableId, testQueryable, nonexistentId} = testProps;
	describe("read()", () => {
		it("reads existing queryable", async () => {
			expect(await Queryable.read(testQueryableId)).to.deep.equal(testQueryable);
		});
		it("returns null when reading nonexistent queryable", async () => {
			expect(await Queryable.read(nonexistentId)).to.be.null;
		});
	});
};

export const testReadAll = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut, PK>,
	allDBItems: T[]
) => {
	describe("readAll()", () => {
		it("returns list of all queryables", async () => {
			const allItems = await Queryable.readAll();
			allItems.forEach((item) => expect(allDBItems).to.deep.contain(item));
		});
	});
};

// We know TMuts will always have all optional properties so {} will always be a valid TMut
export const testUpdate = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut | object, PK>,
	testProps: {
		testQueryableInitializer: TInit,
		testQueryableMutator: TMut,
		nonexistentId: PK,
		getId: (q: T) => PK
	}
) => {
	const {testQueryableInitializer, testQueryableMutator, nonexistentId, getId} = testProps;
	describe("update()", () => {
		it("updates existing queryable", async () => {
			const createdItem = await Queryable.create(testQueryableInitializer);
			const mutatedItem = {...createdItem, ...testQueryableMutator};
			expect(await Queryable.update(getId(createdItem), testQueryableMutator)).to.deep.equal(mutatedItem);
			expect(await Queryable.read(getId(createdItem))).to.deep.equal(mutatedItem);

			// cleanup
			await Queryable.delete(getId(createdItem));
		});
		it("returns null when updating nonexistent queryable", async () => {
			expect(await Queryable.update(nonexistentId, testQueryableMutator)).to.be.null;
		});
		it("does not modify queryable if given empty mutator", async () => {
			const createdItem = await Queryable.create(testQueryableInitializer);
			expect(await Queryable.update(getId(createdItem), {})).to.deep.equal(createdItem);

			// cleanup
			await Queryable.delete(getId(createdItem));
		});
	});
};

export const testDelete = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut | object, PK>,
	testProps: {
		testQueryableInitializer: TInit,
		nonexistentId: PK,
		getId: (q: T) => PK
	}
) => {
	const {testQueryableInitializer, nonexistentId, getId} = testProps;
	describe("delete()", () => {
		it("deletes existing item", async () => {
			const createdItem = await Queryable.create(testQueryableInitializer);
			expect(await Queryable.delete(getId(createdItem))).to.be.true;
			expect(await Queryable.readAll()).to.not.deep.contain(createdItem);
		});
		it("returns false if deleting nonexistent item", async () => {
			expect(await Queryable.delete(nonexistentId)).to.be.false;
		});
	});
};
