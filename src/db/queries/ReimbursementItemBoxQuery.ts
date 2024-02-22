import {ItemBoxId} from "../../types/db/public/ItemBox";
import {ReimbursementId} from "../../types/db/public/Reimbursement";
import ReimbursementItemBox,
{ReimbursementItemBoxInitializer, ReimbursementItemBoxMutator} from "../../types/db/public/ReimbursementItemBox";
import {CompositeCrudQueryable} from "../CompositeCrudQueryable";
import * as DB from "../../db/DB";

const compositeCrudQueries:
	CompositeCrudQueryable<ReimbursementItemBox,
		ReimbursementItemBoxInitializer,
		ReimbursementItemBoxMutator,
		ReimbursementId,
		ItemBoxId>
= {
	async create(object: ReimbursementItemBoxInitializer): Promise<ReimbursementItemBox> {
		// Object.keys and Object.values return things in the same order so this is safe
		const keys = Object.keys(object);
		const values = Object.values(object);

		const queryResponse = await DB.query(
			`INSERT INTO reimbursement_item_box (${keys.join(",")})` +
			`VALUES (${keys.map((prop, i) => `$${i + 1}`).join(",")})` +
			"RETURNING *",
			values
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	},

	async read(reimbursementId: ReimbursementId, itemBoxId: ItemBoxId): Promise<ReimbursementItemBox> {
		const queryResponse = await DB.query(
			"SELECT * FROM reimbursement_item_box WHERE reimbursement_id=$1 AND item_box_id=$2",
			[reimbursementId, itemBoxId]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	},

	async readAll(): Promise<ReimbursementItemBox[]> {
		const queryResponse = await DB.query("SELECT * FROM reimbursement_item_box");
		return queryResponse.rows;
	},

	async update(
		reimbursementId: ReimbursementId,
		itemBoxId: ItemBoxId, mutateObject: ReimbursementItemBoxMutator
	): Promise<ReimbursementItemBox> {
		if (Object.keys(mutateObject).length === 0) {
			return null;
		}

		// Use i+3 for parameter so that $1 and $2 are reserved for the PKs
		const keys = Object.keys(mutateObject).map((prop, i) => `${prop}=$${i + 3}`);
		const queryResponse = await DB.query(
			`UPDATE reimbursement_item_box SET ${keys.join(",")}` +
			" WHERE reimbursement_id=$1 AND item_box_id=$2 RETURNING *",
			[reimbursementId, itemBoxId, ...Object.values(mutateObject)]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	},

	async delete(reimbursementId: ReimbursementId, itemBoxId: ItemBoxId): Promise<boolean> {
		const queryResponse = await DB.query(
			"DELETE FROM reimbursement_item_box WHERE reimbursement_id=$1 AND item_box_id=$2",
			[reimbursementId, itemBoxId]
		);
		return queryResponse.rowCount === 1;
	}
};

const reimbursementItemBoxQueries = {
	/**
	 * Searches in the table for all ReimbursementItemBoxes that are linked to a particular item box.
	 * @param itemBoxId Foreign key of item box to search for
	 * @returns Promise resolving to array of ReimbursementItemBoxes linked to the given itemBoxId
	 */
	async readAllFromItemBox(itemBoxId: ItemBoxId): Promise<ReimbursementItemBox[]> {
		const queryResponse = await DB.query(
			"SELECT * FROM reimbursement_item_box WHERE item_box_id=$1",
			[itemBoxId]
		);
		return queryResponse.rows;
	},

	/**
	 * Searches in the table for all ReimbursementItemBoxes that are linked to a particular reimbursement.
	 * @param reimbursementId Foreign key of reimbursement to search for
	 * @returns Promise resolving to array of ReimbursementItemBoxes linked to the given reimbursementId
	 */
	async readAllFromReimbursement(reimbursementId: ReimbursementId): Promise<ReimbursementItemBox[]> {
		const queryResponse = await DB.query(
			"SELECT * FROM reimbursement_item_box WHERE reimbursement_id=$1",
			[reimbursementId]
		);
		return queryResponse.rows;
	}
};

export default {
	...compositeCrudQueries,
	...reimbursementItemBoxQueries
};
