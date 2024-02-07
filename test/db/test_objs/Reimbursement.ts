import Reimbursement from "../../../src/types/db/public/Reimbursement";
import Dinero from "dinero.js";

export const reimbursementOne: Reimbursement = {
	reimbursement_id: 1,
	receipt_img_url: "url1",
	purchase_total: Dinero({amount: 500, currency: "CAD"}),
	purchase_date: new Date("2024-01-02"),
	reimbursed: false,
	user_id: 1
};

export const reimbursementTwo: Reimbursement = {
	reimbursement_id: 2,
	receipt_img_url: "url2",
	purchase_total: Dinero({amount: 2000, currency: "CAD"}),
	purchase_date: new Date("2024-01-08"),
	reimbursed: false,
	user_id: 2
};
