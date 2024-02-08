/** Identifier type for valid_category */
export type Category = string & {__flavor?: "Category"};

/** Represents the table public.valid_category */
export default interface ValidCategory {
  category: Category;
}

/** Represents the initializer for the table public.valid_category */
export interface ValidCategoryInitializer {
  category: Category;
}

/** Represents the mutator for the table public.valid_category */
export interface ValidCategoryMutator {
  category?: Category;
}

