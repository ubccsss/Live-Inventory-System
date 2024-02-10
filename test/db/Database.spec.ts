import {expect} from "chai";
import * as DB from "../../src/db/DB";
import {itemBoxClifBar} from "./test_objs/ItemBox";

describe("Database tests", function() {

	describe("query()", () => {
		it("performs basic query on database", async () => {
			const queryResult = await DB.query("SELECT * FROM item_box WHERE item_box_id=1");
			expect(queryResult.rowCount).to.equal(1);
			expect(queryResult.rows[0]).to.deep.equal(itemBoxClifBar);
		});
	});

	describe("getClient()", async () => {
		it("Returns one persistent client", async () => {
			// We will test that the client is valid by doing a transaction since those must be done with one client
			const client = await DB.checkoutClient();
			await client.query("BEGIN");
			await client.query("INSERT INTO valid_category (category) VALUES ($1)", ["test_category"]);

			const preCommit = await DB.query("SELECT * FROM valid_category WHERE category=$1", ["test_category"]);
			expect(preCommit.rowCount, "Other client should not see row before transaction is committed").to.equal(0);

			await client.query("COMMIT");
			const postCommit = await DB.query("SELECT * FROM valid_category WHERE category=$1", ["test_category"]);
			expect(postCommit.rowCount).to.equal(1);

			// Cleanup
			await DB.query("DELETE FROM valid_category WHERE category=$1", ["test_category"]);
		});
	});

});
