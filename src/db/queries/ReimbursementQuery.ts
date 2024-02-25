
import {FriendlyReimbursement} from "../../types/DBTypes";
import {UserId} from "../../types/db_internal/public/CsssUser";
import Reimbursement,
{ReimbursementId, ReimbursementInitializer, ReimbursementMutator} from "../../types/db_internal/public/Reimbursement";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";
import ReimbursementItemBoxQuery from "./ReimbursementItemBoxQuery";
import * as DB from "../../db/DB";

const tableName = "reimbursement";
const pkName = "reimbursement_id";

class ReimbursementQuery extends SimpleCrudQueryable<
	Reimbursement,
	ReimbursementInitializer,
	ReimbursementMutator,
	ReimbursementId
> {
	constructor() {
		super(tableName, pkName);
	}

	public async create(object: ReimbursementInitializer): Promise<FriendlyReimbursement> {
		return await this.getFriendlyReimbursement(await super.create(object));
	}

	public async read(primaryKey: ReimbursementId): Promise<FriendlyReimbursement> {
		return await this.getFriendlyReimbursement(await super.read(primaryKey));
	}

	public async readAll(): Promise<FriendlyReimbursement[]> {
		const readAll = await super.readAll();
		return Promise.all(readAll.map(async (reimbursement) => this.getFriendlyReimbursement(reimbursement)));
	}

	public async update(
		primaryKey: ReimbursementId,
		mutateObject: ReimbursementMutator
	): Promise<FriendlyReimbursement> {
		return await this.getFriendlyReimbursement(await super.update(primaryKey, mutateObject));
	}

	/**
	 * Searches in the table for all Reimbursements that are linked to a particular user.
	 * @param csssUser User to find Reimbursements for
	 * @returns Promise resolving to all Reimbursements created by the given user
	 */
	public async readAllFromUser(csssUser: UserId): Promise<FriendlyReimbursement[]> {
		const queryResponse = await DB.query(
			"SELECT * FROM reimbursement WHERE user_id=$1",
			[csssUser]
		);
		return Promise.all(queryResponse.rows.map(async (row) => this.getFriendlyReimbursement(row)));
	}

	/**
	 * Searches in the table for all Reimbursements that have not been reimbursed yet.
	 * @returns Promise resolving to all unreimbursed Reimbursements
	 */
	public async readAllUnreimbursed(): Promise<FriendlyReimbursement[]> {
		const queryResponse = await DB.query(
			"SELECT * FROM reimbursement WHERE reimbursed IS NOT TRUE");
		return Promise.all(queryResponse.rows.map(async (row) => this.getFriendlyReimbursement(row)));
	}

	private async getFriendlyReimbursement(reimbursement: Reimbursement): Promise<FriendlyReimbursement> {
		if (!reimbursement) {
			return null;
		}
		const itemBoxes = await ReimbursementItemBoxQuery.readAllFromReimbursement(reimbursement.reimbursement_id);
		return {
			...reimbursement,
			item_boxes: itemBoxes.map((itemBox) => {
				return {
					item_box_id: itemBox.item_box_id,
					item_quantity: itemBox.item_quantity
				};
			})
		};
	}
}

export default new ReimbursementQuery();
