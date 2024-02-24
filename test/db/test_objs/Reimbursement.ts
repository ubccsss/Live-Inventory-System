import {FriendlyReimbursement} from "../../../src/types/DBTypes";

export const reimbursementOne: FriendlyReimbursement = {
	reimbursement_id: 1,
	receipt_img_url: "url1",
	purchase_total: BigInt(500),
	purchase_date: new Date("2024-01-02T08:00:00.000Z"),
	reimbursed: false,
	user_id: 1,
	item_boxes: [
		{
			item_box_id: 1,
			item_quantity: 2
		}
	]
};

export const reimbursementTwo: FriendlyReimbursement = {
	reimbursement_id: 2,
	receipt_img_url: "url2",
	purchase_total: BigInt(2000),
	purchase_date: new Date("2024-01-08T08:00:00.000Z"),
	reimbursed: false,
	user_id: 2,
	item_boxes: [
		{
			item_box_id: 2,
			item_quantity: 1
		},
		{
			item_box_id: 3,
			item_quantity: 1
		}
	]
};


