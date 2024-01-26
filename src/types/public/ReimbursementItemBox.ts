import {type ReimbursementId} from "./Reimbursement";
import {type ItemBoxId} from "./ItemBox";

/** Represents the table public.reimbursement_item_box */
export default interface ReimbursementItemBox {
  reimbursement_id: ReimbursementId;

  item_box_id: ItemBoxId;

  item_quantity: number;
}

/** Represents the initializer for the table public.reimbursement_item_box */
export interface ReimbursementItemBoxInitializer {
  reimbursement_id: ReimbursementId;

  item_box_id: ItemBoxId;

  item_quantity: number;
}

/** Represents the mutator for the table public.reimbursement_item_box */
export interface ReimbursementItemBoxMutator {
  reimbursement_id?: ReimbursementId;

  item_box_id?: ItemBoxId;

  item_quantity?: number;
}

