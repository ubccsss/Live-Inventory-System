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
	transaction (total, transaction_time, payer_email)
VALUES
	(400, '2024-01-10 14:00:36 -8:00', 'john@example.com'),
	(200, '2024-01-21 10:21:11 -8:00', 'amy@example.com');

INSERT INTO
	transaction_item (transaction_id, item_id, item_quantity)
SELECT
	1,
	item_id,
	1
FROM
	item_individual
WHERE
	name = 'Shin Ramen';

INSERT INTO
	transaction_item (transaction_id, item_id, item_quantity)
SELECT
	1,
	item_id,
	1
FROM
	item_individual
WHERE
	name = 'Coca-Cola';

INSERT INTO
	transaction_item (transaction_id, item_id, item_quantity)
SELECT
	2,
	item_id,
	1
FROM
	item_individual
WHERE
	name = 'Clif Bar';

INSERT INTO
	csss_user (
		email,
		password,
		first_name,
		last_name,
		phone_number,
		is_treasurer
	)
VALUES
	(
		'jane@ubccsss.org',
		'hash1',
		'Jane',
		'Doe',
		'1234567890',
		FALSE
	),
	(
		'george@ubccsss.org',
		'hash2',
		'George',
		'Smith',
		'7776665555',
		FALSE
	),
	(
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
	'2024-01-02 04:05:06 -8:00',
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
	'2024-01-08 15:20:00 -8:00',
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