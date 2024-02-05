import {Dinero} from "dinero.js";
import {type Category} from "./ValidCategory";

/** Identifier type for item_individual */
export type ItemId = number & {__flavor?: "ItemId"};

/** Represents the table public.item_individual */
export default interface ItemIndividual {
  item_id: ItemId;

  name: string;

  description: string;

  price: Dinero;

  category: Category;

  img_url: string | null;

  reservable: boolean;

  quantity_remaining: number;

  low_stock_threshold: number;

  last_restocked: Date | null;

  max_quantity_per_transaction: number;
}

/** Represents the initializer for the table public.item_individual */
export interface ItemIndividualInitializer {
  name: string;

  description: string;

  price: Dinero;

  category: Category;

  img_url?: string | null;

  reservable: boolean;

  quantity_remaining: number;

  low_stock_threshold: number;

  last_restocked?: Date | null;

  max_quantity_per_transaction: number;
}

/** Represents the mutator for the table public.item_individual */
export interface ItemIndividualMutator {
  name?: string;

  description?: string;

  price?: Dinero;

  category?: Category;

  img_url?: string | null;

  reservable?: boolean;

  quantity_remaining?: number;

  low_stock_threshold?: number;

  last_restocked?: Date | null;

  max_quantity_per_transaction?: number;
}

