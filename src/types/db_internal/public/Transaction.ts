/** Identifier type for transaction */
export type TransactionId = number & {__flavor?: "TransactionId"};

/** Represents the table public.transaction */
export default interface Transaction {
  transaction_id: TransactionId;

  total: bigint;

  transaction_time: Date | null;

  payer_email: string | null;
}

/** Represents the initializer for the table public.transaction */
export interface TransactionInitializer {
  total: bigint;

  /** Default value: CURRENT_TIMESTAMP */
  transaction_time?: Date | null;

  payer_email?: string | null;
}

/** Represents the mutator for the table public.transaction */
export interface TransactionMutator {
  total?: bigint;

  transaction_time?: Date | null;

  payer_email?: string | null;
}

