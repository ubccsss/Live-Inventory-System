import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./SimpleCrudQueryable";
import TransactionQuery from "../../../src/db/queries/TransactionQuery";
import * as TestItems from "../test_objs/Transaction";
import {TransactionInitializer, TransactionMutator} from "../../../src/types/db_internal/public/Transaction";
import {expect} from "chai";

const testTransactionInitializer: TransactionInitializer = {
	total: BigInt(100),
	tax_rate: 1200,
	transaction_time: new Date("2024-02-05"),
	payer_email: "peppa@pig.org",
	payment_method: "card",
	cleared: true
};

describe("Transaction Query Tests", () => {
	testCreate(TransactionQuery, {
		testInitializer: testTransactionInitializer,
		getId: (q) => q.transaction_id
	});

	testRead(TransactionQuery, {
		testId: 2,
		testQueryable: TestItems.transactionTwo,
		nonexistentId: -1
	});

	testReadAll(TransactionQuery, Object.values(TestItems));

	const transactionMutator: TransactionMutator = {
		total: BigInt(500),
		payer_email: "none@none.no"
	};

	testUpdate(TransactionQuery, {
		testInitializer: testTransactionInitializer,
		testMutator: transactionMutator,
		nonexistentId: -1,
		getId: (q) => q.transaction_id
	});

	testDelete(TransactionQuery, {
		testInitializer: testTransactionInitializer,
		nonexistentId: -1,
		getId: (q) => q.transaction_id
	});

	const testJohnTransactionInitializer: TransactionInitializer = {
		total: BigInt(50),
		tax_rate: 1025,
		transaction_time: new Date("2024-02-22"),
		payer_email: "john@example.com",
		payment_method: "cash",
		cleared: false
	};

	describe("readAllFromEmail()", () => {
		it("returns all transactions with the specified email", async () => {
			const testItem = await TransactionQuery.create(testJohnTransactionInitializer);
			try {
				expect(await TransactionQuery.readAllFromEmail("john@example.com")).
					to.have.deep.members([TestItems.transactionOne, testItem]);
			} finally {
				await TransactionQuery.delete(testItem.transaction_id);
			}
		});
		it("returns empty list if no transaction with email exists", async () => {
			expect(await TransactionQuery.readAllFromEmail("fake")).to.be.empty;
		});
	});

	describe("readAllCleared()", () => {
		it("returns all cleared items in the database", async () => {
			const testItem = await TransactionQuery.create(testTransactionInitializer);
			try {
				expect(await TransactionQuery.readAllCleared()).
					to.have.deep.members([TestItems.transactionOne, testItem]);
			} finally {
				await TransactionQuery.delete(testItem.transaction_id);
			}
		});
	});

	describe("readAllNotCleared()", () => {
		it("returns all non-cleared items in the database", async () => {
			const testItem = await TransactionQuery.create(testJohnTransactionInitializer);
			try {
				expect(await TransactionQuery.readAllNotCleared()).
					to.have.deep.members([TestItems.transactionTwo, testItem]);
			} finally {
				await TransactionQuery.delete(testItem.transaction_id);
			}
		});
	});
});
