import ReimbursementItemBoxQuery from "../../../src/db/queries/ReimbursementItemBoxQuery";
import {
	ReimbursementItemBoxInitializer,
	ReimbursementItemBoxMutator
} from "../../../src/types/db/public/ReimbursementItemBox";
import {reimbursementOneClifBar} from "../test_objs/ReimbursementItemBox";
import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./CompositeCrudQueryable";
import * as TestItems from "../test_objs/ReimbursementItemBox";
import {expect} from "chai";

const testRIBInitializer: ReimbursementItemBoxInitializer = {
	reimbursement_id: 1,
	item_box_id: 2,
	item_quantity: 1
};

describe("ReimbursementItemBox Query Tests", () => {
	testCreate(ReimbursementItemBoxQuery, {
		testInitializer: testRIBInitializer,
		getId1: (q) => q.reimbursement_id,
		getId2: (q) => q.item_box_id
	});

	testRead(ReimbursementItemBoxQuery, {
		testId1: reimbursementOneClifBar.reimbursement_id,
		testId2: reimbursementOneClifBar.item_box_id,
		testQueryable: reimbursementOneClifBar
	});

	testReadAll(ReimbursementItemBoxQuery, Object.values(TestItems));

	const reimbursementIBMutator: ReimbursementItemBoxMutator = {
		item_quantity: 5
	};

	testUpdate(ReimbursementItemBoxQuery, {
		testInitializer: testRIBInitializer,
		testMutator: reimbursementIBMutator,
		nonexistentId1: -1,
		nonexistentId2: -2,
		getId1: (q) => q.reimbursement_id,
		getId2: (q) => q.item_box_id
	});

	testDelete(ReimbursementItemBoxQuery, {
		testInitializer: testRIBInitializer,
		nonexistentId1: -1,
		nonexistentId2: -2,
		getId1: (q) => q.reimbursement_id,
		getId2: (q) => q.item_box_id
	});

	describe("readAllFromItemBox()", () => {
		it("returns all ReimbursementItemBoxes with the given itemBoxId", async () => {
			const testRIB = await ReimbursementItemBoxQuery.create(testRIBInitializer);
			const ramenRIBs = await ReimbursementItemBoxQuery.readAllFromItemBox(2);
			expect(ramenRIBs).to.have.deep.members([testRIB, TestItems.reimbursementTwoRamen]);

			// cleanup
			await ReimbursementItemBoxQuery.delete(testRIB.reimbursement_id, testRIB.item_box_id);
		});
		it("returns empty array if no ReimbursementItemBoxes match given itemBoxId", async () => {
			expect(await ReimbursementItemBoxQuery.readAllFromItemBox(-1)).to.be.empty;
		});
	});
	describe("readAllFromReimbursement()", () => {
		it("returns all ReimbursementItemBoxes with the given reimbursementId", async () => {
			const r2RIBs = await ReimbursementItemBoxQuery.readAllFromReimbursement(2);
			expect(r2RIBs).to.have.deep.members([TestItems.reimbursementTwoRamen, TestItems.reimbursementTwoCola]);
		});
		it("returns empty array if no ReimbursementItemBoxes match given reimbursementId", async () => {
			expect(await ReimbursementItemBoxQuery.readAllFromReimbursement(-1)).to.be.empty;
		});
	});
});


