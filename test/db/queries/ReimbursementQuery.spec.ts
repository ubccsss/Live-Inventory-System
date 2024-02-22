import {ReimbursementInitializer, ReimbursementMutator} from "../../../src/types/db/public/Reimbursement";
import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./SimpleCrudQueryable";
import ReimbursementQuery from "../../../src/db/queries/ReimbursementQuery";
import * as TestItems from "../test_objs/Reimbursement";

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
});
