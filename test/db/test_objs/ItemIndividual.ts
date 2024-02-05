import Dinero from "dinero.js";
import ItemIndividual from "../../../src/types/db/public/ItemIndividual";

export const clifBar: ItemIndividual = {
	item_id: 1,
	name: "Clif Bar",
	description: "Yummy snack",
	price: Dinero({amount: 200, currency: "CAD"}),
	category: "food",
	img_url: null,
	reservable: false,
	quantity_remaining: 12,
	low_stock_threshold: 5,
	last_restocked: new Date("2023-12-20"),
	max_quantity_per_transaction: 3
};

export const shinRamen: ItemIndividual = {
	item_id: 2,
	name: "Shin Ramen",
	description: "Yummy treat",
	price: Dinero({amount: 300, currency: "CAD"}),
	category: "food",
	img_url: null,
	reservable: false,
	quantity_remaining: 4,
	low_stock_threshold: 3,
	last_restocked: null,
	max_quantity_per_transaction: 1
};

export const cocaCola: ItemIndividual = {
	item_id: 3,
	name: "Coca-Cola",
	description: "Yummy drink",
	price: Dinero({amount: 100, currency: "CAD"}),
	category: "drink",
	img_url: null,
	reservable: false,
	quantity_remaining: 6,
	low_stock_threshold: 2,
	last_restocked: new Date("2023-12-24"),
	max_quantity_per_transaction: 1
};
