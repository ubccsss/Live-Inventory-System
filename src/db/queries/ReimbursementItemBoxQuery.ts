import {ItemBoxId} from "../../types/db/public/ItemBox";
import {ReimbursementId} from "../../types/db/public/Reimbursement";
import ReimbursementItemBox,
{ReimbursementItemBoxInitializer, ReimbursementItemBoxMutator} from "../../types/db/public/ReimbursementItemBox";
import {CompositeCrudQueryable} from "../CompositeCrudQueryable";
import * as DB from "../../db/DB";

const tableName = "reimbursement_item_box";
const pk1Name = "reimbursement_id";
const pk2Name = "item_box_id";

class ReimbursementItemBoxQuery extends CompositeCrudQueryable<
	ReimbursementItemBox,
	ReimbursementItemBoxInitializer,
	ReimbursementItemBoxMutator,
	ReimbursementId,
	ItemBoxId
> {
	constructor() {
		super(tableName, pk1Name, pk2Name);
	}

	/**
	 * Searches in the table for all ReimbursementItemBoxes that are linked to a particular item box.
	 * @param itemBoxId Foreign key of item box to search for
	 * @returns Promise resolving to array of ReimbursementItemBoxes linked to the given itemBoxId
	 */
	public readAllFromItemBox = async (itemBoxId: ItemBoxId): Promise<ReimbursementItemBox[]> => {
		const queryResponse = await DB.query(
			"SELECT * FROM reimbursement_item_box WHERE item_box_id=$1",
			[itemBoxId]
		);
		return queryResponse.rows;
	};

	/**
	 * Searches in the table for all ReimbursementItemBoxes that are linked to a particular reimbursement.
	 * @param reimbursementId Foreign key of reimbursement to search for
	 * @returns Promise resolving to array of ReimbursementItemBoxes linked to the given reimbursementId
	 */
	public readAllFromReimbursement = async (reimbursementId: ReimbursementId): Promise<ReimbursementItemBox[]> => {
		const queryResponse = await DB.query(
			"SELECT * FROM reimbursement_item_box WHERE reimbursement_id=$1",
			[reimbursementId]
		);
		return queryResponse.rows;
	};
}

export default new ReimbursementItemBoxQuery();
