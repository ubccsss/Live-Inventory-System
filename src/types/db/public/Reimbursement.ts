import {type UserId} from "./CsssUser";

/** Identifier type for reimbursement */
export type ReimbursementId = number & {__flavor?: "ReimbursementId"};

/** Represents the table public.reimbursement */
export default interface Reimbursement {
  reimbursement_id: ReimbursementId;

  receipt_img_url: string;

  purchase_total: bigint;

  purchase_date: Date;

  reimbursed: boolean | null;

  user_id: UserId;
}

/** Represents the initializer for the table public.reimbursement */
export interface ReimbursementInitializer {
  receipt_img_url: string;

  purchase_total: bigint;

  purchase_date: Date;

  /** Default value: false */
  reimbursed?: boolean | null;

  user_id: UserId;
}

/** Represents the mutator for the table public.reimbursement */
export interface ReimbursementMutator {
  receipt_img_url?: string;

  purchase_total?: bigint;

  purchase_date?: Date;

  reimbursed?: boolean | null;

  user_id?: UserId;
}

