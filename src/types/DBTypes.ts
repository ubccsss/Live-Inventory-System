import CsssUserInternal from "./db_internal/public/CsssUser";
import ReimbursementInternal from "./db_internal/public/Reimbursement";
import TransactionInternal from "./db_internal/public/Transaction";
import ReimbursementItemBox from "./db_internal/public/ReimbursementItemBox";
import TransactionItem from "./db_internal/public/TransactionItem";

/**
 * Modified type of the internal DB CsssUser with password field omitted for safety
 */
export interface FriendlyCsssUser extends Omit<CsssUserInternal, "password"> {}

/**
 * Modified type of the internal DB Reimbursement with reimbursement item boxes included
 */
export interface FriendlyReimbursement extends ReimbursementInternal {
  item_boxes: Array<Omit<ReimbursementItemBox, "reimbursement_id">>
}

/**
 * Modified type of the internal DB Transaction with transaction items included
 */
export interface FriendlyTransaction extends TransactionInternal {
  items: Array<Omit<TransactionItem, "transaction_id">>
}

