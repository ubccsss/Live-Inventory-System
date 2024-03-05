import {FriendlyTransaction} from "../../../src/types/DBFriendlyTypes";

export const transactionOne: FriendlyTransaction = {
	transaction_id: 1,
	total: BigInt(448),
	tax_rate: 1200,
	transaction_time: new Date("2024-01-10 14:00:36 -8:00"),
	payer_email: "john@example.com",
	payment_method: "card",
	cleared: true,
	items: [
		{
			item_id: 2,
			item_quantity: 1,
			item_price: BigInt(300)
		},
		{
			item_id: 3,
			item_quantity: 1,
			item_price: BigInt(100)
		}
	]
};

export const transactionTwo: FriendlyTransaction = {
	transaction_id: 2,
	total: BigInt(110),
	tax_rate: 1025,
	transaction_time: new Date("2024-01-21 10:21:11 -8:00"),
	payer_email: "amy@example.com",
	payment_method: "cash",
	cleared: false,
	items: [
		{
			item_id: 1,
			item_quantity: 1,
			item_price: BigInt(100)
		}
	]
};
