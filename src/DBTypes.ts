import CsssUserInternal from "./db_internal/public/CsssUser";
import ReimbursementInternal from "./db_internal/public/Reimbursement";
import TransactionInternal from "./db_internal/public/Transaction";
import ReimbursementItemBox from "./db_internal/public/ReimbursementItemBox";
import TransactionItem from "./db_internal/public/TransactionItem";


// Don't expose the password publically
export interface FriendlyCsssUser extends Omit<CsssUserInternal, "password"> {}

// Reimbursement includes item boxes without the reimbursement id since that is redundant
export interface FriendlyReimbursement extends ReimbursementInternal {
  item_boxes: Array<Omit<ReimbursementItemBox, "reimbursement_id">>
}

// Transaction includes items without the transaction id since that is redundant
export interface FriendlyTransaction extends TransactionInternal {
  items: Array<Omit<TransactionItem, "transaction_id">>
}

