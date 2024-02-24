import {FriendlyTransaction} from "../../../src/types/DBTypes";

export const transactionOne: FriendlyTransaction = {
	transaction_id: 1,
	total: BigInt(400),
	transaction_time: new Date("2024-01-10 14:00:36 -8:00"),
	payer_email: "john@example.com",
	items: [
		{
			item_id: 2,
			item_quantity: 1
		},
		{
			item_id: 3,
			item_quantity: 1
		}
	]
};

export const transactionTwo: FriendlyTransaction = {
	transaction_id: 2,
	total: BigInt(200),
	transaction_time: new Date("2024-01-21 10:21:11 -8:00"),
	payer_email: "amy@example.com",
	items: [
		{
			item_id: 1,
			item_quantity: 1
		}
	]
};
