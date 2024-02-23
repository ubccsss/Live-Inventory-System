import CsssUser from "../../../src/types/db_internal/public/CsssUser";

export const csssUserJane: CsssUser = {
	user_id: 1,
	email: "jane@ubccsss.org",
	password: "hash1",
	first_name: "Jane",
	last_name: "Doe",
	phone_number: "1234567890",
	is_treasurer: false
};

export const csssUserGeorge: CsssUser = {
	user_id: 2,
	email: "george@ubccsss.org",
	password: "hash2",
	first_name: "George",
	last_name: "Smith",
	phone_number: "7776665555",
	is_treasurer: false
};

export const csssUserAl: CsssUser = {
	user_id: 3,
	email: "al@ubccsss.org",
	password: "hash3",
	first_name: "Al",
	last_name: "Jones",
	phone_number: "1112223333",
	is_treasurer: true
};
