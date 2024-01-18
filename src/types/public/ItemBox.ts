import {type ItemId} from "./ItemIndividual";

/** Identifier type for item_box */
export type ItemBoxId = number & {__flavor?: "ItemBoxId"};

/** Represents the table public.item_box */
export default interface ItemBox {
  item_box_id: ItemBoxId;

  item_id: ItemId;

  quantity_per_box: number;
}

/** Represents the initializer for the table public.item_box */
export interface ItemBoxInitializer {
  item_id: ItemId;

  quantity_per_box: number;
}

/** Represents the mutator for the table public.item_box */
export interface ItemBoxMutator {
  item_id?: ItemId;

  quantity_per_box?: number;
}

