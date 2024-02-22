import ItemIndividual,
{ItemId, ItemIndividualInitializer, ItemIndividualMutator} from "../../types/db/public/ItemIndividual";
import {Category} from "../../types/db/public/ValidCategory";
import {SimpleCrudQueryable} from "../SimpleCrudQueryable";
import * as DB from "../../db/DB";

const simpleCrudQueries:
SimpleCrudQueryable<ItemIndividual, ItemIndividualInitializer, ItemIndividualMutator, ItemId> = {
	async create(object: ItemIndividualInitializer): Promise<ItemIndividual> {
		// Object.keys and Object.values return things in the same order so this is safe
		const keys = Object.keys(object);
		const values = Object.values(object);

		const queryResponse = await DB.query(
			`INSERT INTO item_individual (${keys.join(",")})` +
			`VALUES (${keys.map((prop, i) => `$${i + 1}`).join(",")})` +
			"RETURNING *",
			values
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	},

	async read(itemId: ItemId): Promise<ItemIndividual> {
		const queryResponse = await DB.query(
			"SELECT * FROM item_individual WHERE item_id=$1",
			[itemId]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	},

	async readAll(): Promise<ItemIndividual[]> {
		const queryResponse = await DB.query("SELECT * FROM item_individual");
		return queryResponse.rows;
	},

	async update(itemId: ItemId, mutateObject: ItemIndividualMutator): Promise<ItemIndividual> {
		if (Object.keys(mutateObject).length === 0) {
			return null;
		}

		// Use i+2 for parameter so that $1 is reserved for the item id
		const keys = Object.keys(mutateObject).map((prop, i) => `${prop}=$${i + 2}`);
		const queryResponse = await DB.query(
			`UPDATE item_individual SET ${keys.join(",")} WHERE item_id=$1 RETURNING *`,
			[itemId, ...Object.values(mutateObject)]
		);
		if (queryResponse.rows.length === 1) {
			return queryResponse.rows[0];
		} else {
			return null;
		}
	},

	async delete(itemId: ItemId): Promise<boolean> {
		const queryResponse = await DB.query(
			"DELETE FROM item_individual WHERE item_id=$1",
			[itemId]
		);
		return queryResponse.rowCount === 1;
	}
};

const itemIndividualQueries = {
	/**
	 * Searches for all items that have the specified category.
	 * @param category Category to search within
	 * @returns Promise resolving to all items in the table with the specified category
	 */
	async readAllFromCategory(category: Category): Promise<ItemIndividual[]> {
		const queryResponse = await DB.query(
			"SELECT * FROM item_individual WHERE category=$1",
			[category]
		);
		return queryResponse.rows;
	}
};

export default {
	...simpleCrudQueries,
	...itemIndividualQueries
};
