import {type default as PaymentMethodType} from "./PaymentMethodType";

/** Identifier type for transaction */
export type TransactionId = number & {__flavor?: "TransactionId"};

/** Represents the table public.transaction */
export default interface Transaction {
  transaction_id: TransactionId;

  total: bigint;

  tax_rate: number;

  transaction_time: Date;

  payer_email: string;

  payment_method: PaymentMethodType;

  cleared: boolean;
}

/** Represents the initializer for the table public.transaction */
export interface TransactionInitializer {
  total: bigint;

  tax_rate: number;

  /** Default value: CURRENT_TIMESTAMP */
  transaction_time?: Date;

  payer_email: string;

  payment_method: PaymentMethodType;

  /** Default value: false */
  cleared?: boolean;
}

/** Represents the mutator for the table public.transaction */
export interface TransactionMutator {
  total?: bigint;

  tax_rate?: number;

  transaction_time?: Date;

  payer_email?: string;

  payment_method?: PaymentMethodType;

  cleared?: boolean;
}

