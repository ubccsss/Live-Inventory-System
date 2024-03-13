/** Identifier type for csss_user */
export type UserId = string & {__flavor?: "UserId"};

/** Represents the table public.csss_user */
export default interface CsssUser {
  user_id: UserId;

  email: string;

  password: string;

  first_name: string;

  last_name: string;

  phone_number: string | null;

  is_treasurer: boolean;
}

/** Represents the initializer for the table public.csss_user */
export interface CsssUserInitializer {
  // /** Default value: gen_random_uuid() */
  // user_id?: UserId;

  email: string;

  password: string;

  first_name: string;

  last_name: string;

  phone_number?: string | null;

  /** Default value: false */
  is_treasurer?: boolean;
}

/** Represents the mutator for the table public.csss_user */
export interface CsssUserMutator {
  user_id?: UserId;

  email?: string;

  password?: string;

  first_name?: string;

  last_name?: string;

  phone_number?: string | null;

  is_treasurer?: boolean;
}

