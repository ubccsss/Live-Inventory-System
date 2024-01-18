import {type ReimbursementId} from "./Reimbursement";
import {type ItemBoxId} from "./ItemBox";

/** Represents the table public.reimbursement_item */
export default interface ReimbursementItem {
  reimbursement_id: ReimbursementId;

  item_box_id: ItemBoxId;

  item_quantity: number;
}

/** Represents the initializer for the table public.reimbursement_item */
export interface ReimbursementItemInitializer {
  reimbursement_id: ReimbursementId;

  item_box_id: ItemBoxId;

  item_quantity: number;
}

/** Represents the mutator for the table public.reimbursement_item */
export interface ReimbursementItemMutator {
  reimbursement_id?: ReimbursementId;

  item_box_id?: ItemBoxId;

  item_quantity?: number;
}

