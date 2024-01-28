import {ItemBoxId} from "../../types/public/ItemBox";
import {ReimbursementId} from "../../types/public/Reimbursement";
import ReimbursementItemBox,
{ReimbursementItemBoxInitializer, ReimbursementItemBoxMutator} from "../../types/public/ReimbursementItemBox";
import {CompositeCrudQueryable} from "../Queryable";

const compositeCrudQueries:
	CompositeCrudQueryable<ReimbursementItemBox,
		ReimbursementItemBoxInitializer,
		ReimbursementItemBoxMutator,
		ReimbursementId,
		ItemBoxId>
= {
	async create(object: ReimbursementItemBoxInitializer): Promise<ReimbursementItemBox> {
		throw new Error("Method not implemented.");
	},

	async read(reimbursementId: ReimbursementId, itemBoxId: ItemBoxId): Promise<ReimbursementItemBox> {
		throw new Error("Method not implemented.");
	},

	async readAll(): Promise<ReimbursementItemBox[]> {
		throw new Error("Method not implemented.");
	},

	async update(reimbursementId: ReimbursementId, pk2: ItemBoxId, mutateObject: ReimbursementItemBoxMutator):
	Promise<void> {
		throw new Error("Method not implemented.");
	},

	async delete(reimbursementId: ReimbursementId, pk2: ItemBoxId): Promise<void> {
		throw new Error("Method not implemented.");
	}
};

const reimbursementItemBoxQueries = {
	/**
	 * Searches in the table for all ReimbursementItemBoxes that are linked to a particular item box.
	 * @param itemBoxId Foreign key of item box to search for
	 * @returns Promise resolving to array of ReimbursementItemBoxes linked to the given itemBoxId
	 */
	async readAllFromItemBox(itemBoxId: ItemBoxId): Promise<ReimbursementItemBox[]> {
		throw new Error("Method not implemented.");
	},

	/**
	 * Searches in the table for all ReimbursementItemBoxes that are linked to a particular reimbursement.
	 * @param reimbursementId Foreign key of reimbursement to search for
	 * @returns Promise resolving to array of ReimbursementItemBoxes linked to the given reimbursementId
	 */
	async readAllFromReimbursement(reimbursementId: ReimbursementId): Promise<ReimbursementItemBox[]> {
		throw new Error("Method not implemented.");
	}
};

export default {
	...compositeCrudQueries,
	...reimbursementItemBoxQueries
};
