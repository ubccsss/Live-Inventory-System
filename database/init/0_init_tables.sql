\c cube_data;

CREATE TABLE valid_category (
	category TEXT PRIMARY KEY
);

CREATE TABLE item_individual (
	item_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name TEXT NOT NULL UNIQUE,
	description TEXT NOT NULL,
	price BIGINT NOT NULL CONSTRAINT nonneg_price CHECK (price >= 0),
	category TEXT NOT NULL REFERENCES valid_category ON UPDATE CASCADE ON DELETE RESTRICT, -- don't allow a category row to be removed if an item references that row
	img_url TEXT, -- img optional
	reservable BOOL NOT NULL,
	quantity_remaining INT NOT NULL CONSTRAINT nonneg_quantity CHECK (quantity_remaining >= 0),
	low_stock_threshold INT NOT NULL CONSTRAINT nonneg_threshold CHECK (low_stock_threshold >= 0),
	last_restocked DATE, -- maybe non null to allow for initial setup?
	max_quantity_per_transaction INT NOT NULL CONSTRAINT positive_max CHECK (max_quantity_per_transaction > 0)
);

CREATE TABLE item_box (
	item_box_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	item_id INT NOT NULL REFERENCES item_individual ON UPDATE CASCADE ON DELETE CASCADE, -- if we delete an item, delete all its boxes too
	quantity_per_box INT NOT NULL CONSTRAINT pos_quantity CHECK (quantity_per_box > 0)
);

CREATE TABLE transaction (
	transaction_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	total BIGINT NOT NULL CONSTRAINT nonneg_total CHECK (total >= 0),
	tax_rate INT NOT NULL CONSTRAINT nonneg_tax_rate CHECK (tax_rate >= 0), -- represents a tax percent with 2 decimal points precision (ex. 10.25% -> 1025)
	transaction_time NOT NULL TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- auto create transaction timestamp
	payer_email NOT NULL TEXT CHECK (payer_email ~ '^[a-z0-9!.#$%&''*+/=?^_`{|}~-]+@([a-z0-9]+[.])+[a-z0-9]+$'),
	payment_method NOT NULL TEXT CHECK (payment_method IN ('cash', 'card')),
	cleared BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE transaction_item (
	transaction_id INT NOT NULL REFERENCES transaction ON UPDATE CASCADE ON DELETE CASCADE, -- if we delete a transaction, also delete its details
	item_id INT NOT NULL REFERENCES item_individual ON UPDATE CASCADE ON DELETE RESTRICT, -- don't allow an item that's in a transaction to be deleted
	item_quantity INT NOT NULL CONSTRAINT positive_quantity CHECK (item_quantity > 0),
	item_price BIGINT NOT NULL CONSTRAINT nonneg_price CHECK (item_price >= 0),
	CONSTRAINT transaction_item_pk PRIMARY KEY (transaction_id, item_id)
);

CREATE TABLE csss_user (
	user_id uuid PRIMARY KEY GENERATED ALWAYS AS gen_random_uuid() STORED,
	email TEXT NOT NULL UNIQUE CHECK (email ~ '^[a-z0-9!.#$%&''*+/=?^_`{|}~-]+@([a-z0-9]+[.])+[a-z0-9]+$'),
	password TEXT NOT NULL, -- should be a hash
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	phone_number VARCHAR(10) CHECK (phone_number ~ '^[0-9]{10}$'),
	is_treasurer BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE reimbursement (
	reimbursement_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	receipt_img_url TEXT NOT NULL,
	purchase_total BIGINT NOT NULL CONSTRAINT positive_purchase_total CHECK (purchase_total > 0),
	purchase_date DATE NOT NULL,
	reimbursed BOOL NOT NULL DEFAULT FALSE,
	user_id INT NOT NULL REFERENCES csss_user ON UPDATE CASCADE ON DELETE RESTRICT -- don't allow an officer to be deleted if they have reimbursements
);

CREATE TABLE reimbursement_item_box (
	reimbursement_id INT NOT NULL REFERENCES reimbursement ON UPDATE CASCADE ON DELETE CASCADE, -- if we delete a reimbursement, also delete its details
	item_box_id INT NOT NULL REFERENCES item_box ON UPDATE CASCADE ON DELETE RESTRICT, -- don't allow an item box that's in a transaction to be deleted
	item_quantity INT NOT NULL CONSTRAINT positive_quantity CHECK (item_quantity > 0),
	CONSTRAINT reimbursement_item_box_pk PRIMARY KEY (reimbursement_id, item_box_id)
);