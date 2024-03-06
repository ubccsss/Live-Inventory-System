import {FriendlyReimbursement} from "../../../src/types/DBFriendlyTypes";

export const reimbursementOne: FriendlyReimbursement = {
	reimbursement_id: 1,
	receipt_img_url: "url1",
	purchase_total: BigInt(500),
	purchase_date: new Date("2024-01-02T08:00:00.000Z"),
	reimbursed: false,
	user_id: "44b309da-c186-4cb4-a7a2-5b4a47276fab",
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
	user_id: "74c4d25d-49eb-4ab9-86e3-dd4d313f190c",
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


