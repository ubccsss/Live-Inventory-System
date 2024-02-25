import {ReimbursementInitializer, ReimbursementMutator} from "../../../src/types/db_internal/public/Reimbursement";
import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./SimpleCrudQueryable";
import ReimbursementQuery from "../../../src/db/queries/ReimbursementQuery";
import * as TestItems from "../test_objs/Reimbursement";
import {expect} from "chai";

const testReimbursementInitializer: ReimbursementInitializer = {
	receipt_img_url: "url3",
	purchase_total: BigInt(600),
	purchase_date: new Date("2024-02-02T08:00:00.000Z"),
	user_id: 3
};

describe("Reimbursement Query Tests", () => {
	testCreate(ReimbursementQuery, {
		testInitializer: testReimbursementInitializer,
		getId: (q) => q.reimbursement_id
	});

	testRead(ReimbursementQuery, {
		testId: 2,
		testQueryable: TestItems.reimbursementTwo,
		nonexistentId: -1
	});

	testReadAll(ReimbursementQuery, Object.values(TestItems));

	const reimbursementMutator: ReimbursementMutator = {
		purchase_date: new Date("2024-01-01T08:00:00.000Z"),
		reimbursed: true
	};

	testUpdate(ReimbursementQuery, {
		testInitializer: testReimbursementInitializer,
		testMutator: reimbursementMutator,
		nonexistentId: -1,
		getId: (q) => q.reimbursement_id
	});

	testDelete(ReimbursementQuery, {
		testInitializer: testReimbursementInitializer,
		nonexistentId: -1,
		getId: (q) => q.reimbursement_id
	});

	const testMultipleReimbursementInitializer: ReimbursementInitializer = {
		receipt_img_url: "url3",
		purchase_total: BigInt(1000),
		purchase_date: new Date("2024-02-09T08:00:00.000Z"),
		user_id: 1
	};

	describe("readAllFromUser()", () => {
		it("returns all reimbursements created by a user", async () => {
			const createdItem = await ReimbursementQuery.create(testMultipleReimbursementInitializer);
			try {
				const reimbursements = await ReimbursementQuery.readAllFromUser(1);
				expect(reimbursements).to.have.deep.members([TestItems.reimbursementOne, createdItem]);
			} finally {
				ReimbursementQuery.delete(createdItem.reimbursement_id);
			}
		});
		it("returns empty list for user with no reimbursements", async () => {
			expect(await ReimbursementQuery.readAllFromUser(3)).to.be.empty;
		});
	});
});
