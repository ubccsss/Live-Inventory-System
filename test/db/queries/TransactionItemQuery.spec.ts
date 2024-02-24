import TransactionItemQuery from "../../../src/db/queries/TransactionItemQuery";
import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./CompositeCrudQueryable";
import * as TestItems from "../test_objs/TransactionItem";
import {expect} from "chai";
import {
	TransactionItemInitializer,
	TransactionItemMutator
} from "../../../src/types/db_internal/public/TransactionItem";

const testTIInitializer: TransactionItemInitializer = {
	transaction_id: 2,
	item_id: 3,
	item_quantity: 1
};

describe("TransactionItem Query Tests", () => {
	testCreate(TransactionItemQuery, {
		testInitializer: testTIInitializer,
		getId1: (q) => q.transaction_id,
		getId2: (q) => q.item_id
	});

	testRead(TransactionItemQuery, {
		testId1: TestItems.transactionOneRamen.transaction_id,
		testId2: TestItems.transactionOneRamen.item_id,
		nonexistentId1: -1,
		nonexistentId2: -2,
		testQueryable: TestItems.transactionOneRamen
	});

	testReadAll(TransactionItemQuery, Object.values(TestItems));

	const transactionItemMutator: TransactionItemMutator = {
		item_quantity: 5
	};

	testUpdate(TransactionItemQuery, {
		testInitializer: testTIInitializer,
		testMutator: transactionItemMutator,
		nonexistentId1: -1,
		nonexistentId2: -2,
		getId1: (q) => q.transaction_id,
		getId2: (q) => q.item_id
	});

	testDelete(TransactionItemQuery, {
		testInitializer: testTIInitializer,
		nonexistentId1: -1,
		nonexistentId2: -2,
		getId1: (q) => q.transaction_id,
		getId2: (q) => q.item_id
	});

	describe("readAllFromItem()", () => {
		it("returns all ReimbursementItems with the given itemId", async () => {
			const testTI = await TransactionItemQuery.create(testTIInitializer);
			try {
				const ramenRIBs = await TransactionItemQuery.readAllFromItem(3);
				expect(ramenRIBs).to.have.deep.members([testTI, TestItems.transactionOneCola]);
			} finally {
				// cleanup
				await TransactionItemQuery.delete(testTI.transaction_id, testTI.item_id);
			}
		});
		it("returns empty array if no ReimbursementItems match given itemId", async () => {
			expect(await TransactionItemQuery.readAllFromItem(-1)).to.be.empty;
		});
	});
	describe("readAllFromTransaction()", () => {
		it("returns all Transactions with the given transactionId", async () => {
			const transactionTwoTIs = await TransactionItemQuery.readAllFromTransaction(1);
			expect(transactionTwoTIs).to.have.deep.members(
				[TestItems.transactionOneCola, TestItems.transactionOneRamen]
			);
		});
		it("returns empty array if no Transactions match given transactionId", async () => {
			expect(await TransactionItemQuery.readAllFromTransaction(-1)).to.be.empty;
		});
	});
});


