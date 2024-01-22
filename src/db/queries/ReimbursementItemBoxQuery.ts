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
	create(object: ReimbursementItemBoxInitializer): void {
		throw new Error("Method not implemented.");
	},

	read(reimbursementId: ReimbursementId, itemBoxId: ItemBoxId): ReimbursementItemBox {
		throw new Error("Method not implemented.");
	},

	readAll(): ReimbursementItemBox[] {
		throw new Error("Method not implemented.");
	},

	update(reimbursementId: ReimbursementId, pk2: ItemBoxId, mutateObject: ReimbursementItemBoxMutator): void {
		throw new Error("Method not implemented.");
	},

	delete(reimbursementId: ReimbursementId, pk2: ItemBoxId): void {
		throw new Error("Method not implemented.");
	}
};

const reimbursementItemBoxQueries = {
	/**
	 * Searches in the table for all ReimbursementItemBoxes that are linked to a particular item box.
	 * @param itemBoxId Foreign key of item box to search for
	 * @returns Array of ReimbursementItemBoxes linked to the given itemBoxId
	 */
	readAllFromItemBox(itemBoxId: ItemBoxId): ReimbursementItemBox[] {
		throw new Error("Method not implemented.");
	},

	/**
	 * Searches in the table for all ReimbursementItemBoxes that are linked to a particular reimbursement.
	 * @param reimbursementId Foreign key of reimbursement to search for
	 * @returns Array of ReimbursementItemBoxes linked to the given reimbursementId
	 */
	readAllFromReimbursement(reimbursementId: ReimbursementId): ReimbursementItemBox[] {
		throw new Error("Method not implemented.");
	}
};

export default {
	...compositeCrudQueries,
	...reimbursementItemBoxQueries
};
