import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./SimpleCrudQueryable";
import TransactionQuery from "../../../src/db/queries/TransactionQuery";
import * as TestItems from "../test_objs/Transaction";
import {TransactionInitializer, TransactionMutator} from "../../../src/types/db_internal/public/Transaction";

const testTransactioninitializer: TransactionInitializer = {
	total: BigInt(100),
	transaction_time: new Date("2024-02-05"),
	payer_email: "peppa@pig.org"
};

describe("Transaction Query Tests", () => {
	testCreate(TransactionQuery, {
		testInitializer: testTransactioninitializer,
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
		testInitializer: testTransactioninitializer,
		testMutator: transactionMutator,
		nonexistentId: -1,
		getId: (q) => q.transaction_id
	});

	testDelete(TransactionQuery, {
		testInitializer: testTransactioninitializer,
		nonexistentId: -1,
		getId: (q) => q.transaction_id
	});
});
