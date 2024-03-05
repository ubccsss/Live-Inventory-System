import {type TransactionId} from "./Transaction";
import {type ItemId} from "./ItemIndividual";

/** Represents the table public.transaction_item */
export default interface TransactionItem {
  transaction_id: TransactionId;

  item_id: ItemId;

  item_quantity: number;

  item_price: bigint;
}

/** Represents the initializer for the table public.transaction_item */
export interface TransactionItemInitializer {
  transaction_id: TransactionId;

  item_id: ItemId;

  item_quantity: number;

  item_price: bigint;
}

/** Represents the mutator for the table public.transaction_item */
export interface TransactionItemMutator {
  transaction_id?: TransactionId;

  item_id?: ItemId;

  item_quantity?: number;

  item_price?: bigint;
}

