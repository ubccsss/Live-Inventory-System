/* eslint-disable no-unused-expressions */
import {expect} from "chai";
import {CompositeCrudQueryable} from "../../../src/db/Queryable";

export const testCreate = <T, TInit, TMut, PK1, PK2>(
	Queryable: CompositeCrudQueryable<T, TInit, TMut, PK1, PK2>,
	testProps: {
		testInitializer: TInit,
		getId1: (q: T) => PK1
		getId2: (q: T) => PK2
	}
) => {
	const {testInitializer, getId1, getId2} = testProps;
	describe("create()", () => {
		it("creates basic queryable", async () => {
			const createdItem = await Queryable.create(testInitializer);
			try {
				expect(await Queryable.read(getId1(createdItem), getId2(createdItem))).to.deep.equal(createdItem);
				expect(await Queryable.readAll()).to.deep.contain(createdItem);
			} finally {
				// cleanup
				await Queryable.delete(getId1(createdItem), getId2(createdItem));
			}
		});
	});
};

export const testRead = <T, TInit, TMut, PK1, PK2>(
	Queryable: CompositeCrudQueryable<T, TInit, TMut, PK1, PK2>,
	testProps: {
		testId1: PK1,
		testId2: PK2,
		nonexistentId1: PK1,
		nonexistentId2: PK2,
		testQueryable: T
	}
) => {
	const {testId1, testId2, nonexistentId1, nonexistentId2, testQueryable} = testProps;
	describe("read()", () => {
		it("reads existing queryable", async () => {
			expect(await Queryable.read(testId1, testId2)).to.deep.equal(testQueryable);
		});
		it("returns null when reading nonexistent queryable", async () => {
			expect(await Queryable.read(nonexistentId1, nonexistentId2)).to.be.null;
		});
	});
};

export const testReadAll = <T, TInit, TMut, PK1, PK2>(
	Queryable: CompositeCrudQueryable<T, TInit, TMut, PK1, PK2>,
	allTableQueryables: T[]
) => {
	describe("readAll()", () => {
		it("returns list of all queryables", async () => {
			expect(await Queryable.readAll()).to.have.deep.members(allTableQueryables);
		});
	});
};

// We know TMuts will always have all optional properties so {} will always be a valid TMut
export const testUpdate = <T, TInit, TMut, PK1, PK2>(
	Queryable: CompositeCrudQueryable<T, TInit, TMut | object, PK1, PK2>,
	testProps: {
		testInitializer: TInit,
		testMutator: TMut,
		nonexistentId1: PK1,
		nonexistentId2: PK2,
		getId1: (q: T) => PK1,
		getId2: (q: T) => PK2
	}
) => {
	const {testInitializer, testMutator, nonexistentId1, nonexistentId2, getId1, getId2} = testProps;
	describe("update()", () => {
		it("updates existing queryable", async () => {
			const createdItem = await Queryable.create(testInitializer);
			try {
				const mutatedItem = {...createdItem, ...testMutator};
				expect(await Queryable.update(getId1(createdItem), getId2(createdItem), testMutator))
					.to.deep.equal(mutatedItem);
				expect(await Queryable.read(getId1(createdItem), getId2(createdItem))).to.deep.equal(mutatedItem);
			} finally {
				// cleanup
				await Queryable.delete(getId1(createdItem), getId2(createdItem));
			}
		});
		it("returns null when updating nonexistent queryable", async () => {
			expect(await Queryable.update(nonexistentId1, nonexistentId2, testMutator)).to.be.null;
		});
		it("returns null if given empty mutator", async () => {
			const createdItem = await Queryable.create(testInitializer);
			try {
				expect(await Queryable.update(getId1(createdItem), getId2(createdItem), {})).to.be.null;
			} finally {
				// cleanup
				await Queryable.delete(getId1(createdItem), getId2(createdItem));
			}
		});
	});
};

export const testDelete = <T, TInit, TMut, PK1, PK2>(
	Queryable: CompositeCrudQueryable<T, TInit, TMut, PK1, PK2>,
	testProps: {
		testInitializer: TInit,
		nonexistentId1: PK1,
		nonexistentId2: PK2,
		getId1: (q: T) => PK1,
		getId2: (q: T) => PK2
	}
) => {
	const {testInitializer, nonexistentId1, nonexistentId2, getId1, getId2} = testProps;
	describe("delete()", () => {
		it("deletes existing item", async () => {
			const createdItem = await Queryable.create(testInitializer);
			expect(await Queryable.delete(getId1(createdItem), getId2(createdItem))).to.be.true;
			expect(await Queryable.readAll()).to.not.deep.contain(createdItem);
		});
		it("returns false if deleting nonexistent item", async () => {
			expect(await Queryable.delete(nonexistentId1, nonexistentId2)).to.be.false;
		});
	});
};
