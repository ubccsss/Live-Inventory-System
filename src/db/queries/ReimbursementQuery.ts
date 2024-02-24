
import {FriendlyReimbursement} from "../../types/DBTypes";
import Reimbursement,
{ReimbursementId, ReimbursementInitializer, ReimbursementMutator} from "../../types/db_internal/public/Reimbursement";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";
import ReimbursementItemBoxQuery from "./ReimbursementItemBoxQuery";

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
