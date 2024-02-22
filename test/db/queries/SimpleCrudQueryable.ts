/* eslint-disable no-unused-expressions */
import {expect} from "chai";
import {SimpleCrudQueryable} from "../../../src/db/SimpleCrudQueryable";

export const testCreate = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut, PK>,
	testProps: {
		testInitializer: TInit,
		getId: (q: T) => PK
	}
) => {
	const {testInitializer, getId} = testProps;
	describe("create()", () => {
		it("creates basic queryable", async () => {
			const createdItem = await Queryable.create(testInitializer);
			try {
				expect(await Queryable.read(getId(createdItem))).to.deep.equal(createdItem);
				expect(await Queryable.readAll()).to.deep.contain(createdItem);
			} finally {
				// cleanup
				await Queryable.delete(getId(createdItem));
			}
		});
	});
};

export const testRead = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut, PK>,
	testProps: {
		testId: PK,
		testQueryable: T,
		nonexistentId: PK
	}
) => {
	const {testId, testQueryable, nonexistentId} = testProps;
	describe("read()", () => {
		it("reads existing queryable", async () => {
			expect(await Queryable.read(testId)).to.deep.equal(testQueryable);
		});
		it("returns null when reading nonexistent queryable", async () => {
			expect(await Queryable.read(nonexistentId)).to.be.null;
		});
	});
};

export const testReadAll = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut, PK>,
	allTableQueryables: T[]
) => {
	describe("readAll()", () => {
		it("returns list of all queryables", async () => {
			expect(await Queryable.readAll()).to.have.deep.members(allTableQueryables);
		});
	});
};

// We know TMuts will always have all optional properties so {} will always be a valid TMut
export const testUpdate = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut | object, PK>,
	testProps: {
		testInitializer: TInit,
		testMutator: TMut,
		nonexistentId: PK,
		getId: (q: T) => PK
	}
) => {
	const {testInitializer, testMutator, nonexistentId, getId} = testProps;
	describe("update()", () => {
		it("updates existing queryable", async () => {
			const createdItem = await Queryable.create(testInitializer);
			try {
				const mutatedItem = {...createdItem, ...testMutator};
				expect(await Queryable.update(getId(createdItem), testMutator)).to.deep.equal(mutatedItem);
				expect(await Queryable.read(getId(createdItem))).to.deep.equal(mutatedItem);
			} finally {
				// cleanup
				await Queryable.delete(getId(createdItem));
			}
		});
		it("returns null when updating nonexistent queryable", async () => {
			expect(await Queryable.update(nonexistentId, testMutator)).to.be.null;
		});
		it("returns null if given empty mutator", async () => {
			const createdItem = await Queryable.create(testInitializer);
			try {
				expect(await Queryable.update(getId(createdItem), {})).to.be.null;
			} finally {
				// cleanup
				await Queryable.delete(getId(createdItem));
			}
		});
	});
};

export const testDelete = <T, TInit, TMut, PK>(
	Queryable: SimpleCrudQueryable<T, TInit, TMut, PK>,
	testProps: {
		testInitializer: TInit,
		nonexistentId: PK,
		getId: (q: T) => PK
	}
) => {
	const {testInitializer, nonexistentId, getId} = testProps;
	describe("delete()", () => {
		it("deletes existing item", async () => {
			const createdItem = await Queryable.create(testInitializer);
			expect(await Queryable.delete(getId(createdItem))).to.be.true;
			expect(await Queryable.readAll()).to.not.deep.contain(createdItem);
		});
		it("returns false if deleting nonexistent item", async () => {
			expect(await Queryable.delete(nonexistentId)).to.be.false;
		});
	});
};
