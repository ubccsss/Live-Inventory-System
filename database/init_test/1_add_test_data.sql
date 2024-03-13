\c test_data;

INSERT INTO
	valid_category (category)
VALUES
	('food'),
	('drink'),
	('merch'),
	('ticket');

INSERT INTO
	item_individual (
		name,
		description,
		price,
		category,
		img_url,
		reservable,
		quantity_remaining,
		low_stock_threshold,
		last_restocked,
		max_quantity_per_transaction
	)
VALUES
	(
		'Clif Bar',
		'Yummy snack',
		200,
		'food',
		NULL,
		FALSE,
		12,
		5,
		'2023-12-20',
		3
	),
	(
		'Shin Ramen',
		'Yummy treat',
		300,
		'food',
		NULL,
		FALSE,
		4,
		3,
		NULL,
		1
	),
	(
		'Coca-Cola',
		'Yummy drink',
		100,
		'drink',
		NULL,
		FALSE,
		6,
		2,
		'2023-12-24',
		1
	);

INSERT INTO
	item_box (item_id, quantity_per_box)
SELECT
	item_id,
	12
FROM
	item_individual
WHERE
	name = 'Clif Bar';

INSERT INTO
	item_box (item_id, quantity_per_box)
SELECT
	item_id,
	6
FROM
	item_individual
WHERE
	name = 'Shin Ramen';

INSERT INTO
	item_box (item_id, quantity_per_box)
SELECT
	item_id,
	12
FROM
	item_individual
WHERE
	name = 'Coca-Cola';

INSERT INTO
	transaction (total, tax_rate, transaction_time, payer_email, payment_method, cleared)
VALUES
	(448, 1200, '2024-01-10 14:00:36 -8:00', 'john@example.com', 'card', TRUE),
	(110, 1025, '2024-01-21 10:21:11 -8:00', 'amy@example.com', 'cash', FALSE);

INSERT INTO
	transaction_item (transaction_id, item_id, item_quantity, item_price)
SELECT
	1,
	item_id,
	1,
	300
FROM
	item_individual
WHERE
	name = 'Shin Ramen';

INSERT INTO
	transaction_item (transaction_id, item_id, item_quantity, item_price)
SELECT
	1,
	item_id,
	1,
	100
FROM
	item_individual
WHERE
	name = 'Coca-Cola';

INSERT INTO
	transaction_item (transaction_id, item_id, item_quantity, item_price)
SELECT
	2,
	item_id,
	1,
	100
FROM
	item_individual
WHERE
	name = 'Clif Bar';

INSERT INTO
	csss_user (
		user_id,
		email,
		password,
		first_name,
		last_name,
		phone_number,
		is_treasurer
	)
VALUES
	(
		'44b309da-c186-4cb4-a7a2-5b4a47276fab',
		'jane@ubccsss.org',
		'hash1',
		'Jane',
		'Doe',
		'1234567890',
		FALSE
	),
	(
		'74c4d25d-49eb-4ab9-86e3-dd4d313f190c',
		'george@ubccsss.org',
		'hash2',
		'George',
		'Smith',
		'7776665555',
		FALSE
	),
	(
		'cb4ec76c-43b1-48a5-bb1a-b5da8c02a473',
		'al@ubccsss.org',
		'hash3',
		'Al',
		'Jones',
		'1112223333',
		TRUE
	);

INSERT INTO
	reimbursement (
		receipt_img_url,
		purchase_total,
		purchase_date,
		user_id
	)
SELECT
	'url1',
	500,
	'2024-01-02',
	user_id
FROM
	csss_user
WHERE
	email = 'jane@ubccsss.org';

INSERT INTO
	reimbursement (
		receipt_img_url,
		purchase_total,
		purchase_date,
		user_id
	)
SELECT
	'url2',
	2000,
	'2024-01-08',
	user_id
FROM
	csss_user
WHERE
	email = 'george@ubccsss.org';

INSERT INTO
	reimbursement_item_box (
		reimbursement_id,
		item_box_id,
		item_quantity
	)
VALUES
	(1, 1, 2),
	(2, 2, 1),
	(2, 3, 1);