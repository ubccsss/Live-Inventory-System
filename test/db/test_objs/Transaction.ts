import Transaction from "../../../src/types/db_internal/public/Transaction";

export const transactionOne: Transaction = {
	transaction_id: 1,
	total: BigInt(400),
	transaction_time: new Date("2024-01-10 14:00:36 -8:00"),
	payer_email: "john@example.com"
};

export const transactionTwo: Transaction = {
	transaction_id: 2,
	total: BigInt(200),
	transaction_time: new Date("2024-01-21 10:21:11 -8:00"),
	payer_email: "amy@example.com"
};
