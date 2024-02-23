import Reimbursement from "../../../src/types/db_internal/public/Reimbursement";

export const reimbursementOne: Reimbursement = {
	reimbursement_id: 1,
	receipt_img_url: "url1",
	purchase_total: BigInt(500),
	purchase_date: new Date("2024-01-02T08:00:00.000Z"),
	reimbursed: false,
	user_id: 1
};

export const reimbursementTwo: Reimbursement = {
	reimbursement_id: 2,
	receipt_img_url: "url2",
	purchase_total: BigInt(2000),
	purchase_date: new Date("2024-01-08T08:00:00.000Z"),
	reimbursed: false,
	user_id: 2
};
