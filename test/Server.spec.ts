import Server from "../src/rest/Server";
import request, {Response} from "supertest";
import {expect} from "chai";
import {App} from "../src/App";

describe("Express server tests", function() {
	describe("Endpoint tests", function(){
		let server: Server;

		before(async () => {
			server = new Server(4321);
			await server.start();
            // TODO: start server here once and handle errors properly
		});

		after(async () => {
			await server.stop();
		});

		it("GET test", async () => {
			try {
				console.log("Before request");
				return request(server.server)
					.get("/echo/hello")
					.set("Accept", "application/json")
					.then((res) => {
						expect(res.status).to.be.equal(200);
						expect(res.body.result).to.be.equal("hello...hello");
					});
			} catch (err) {
				console.log(err);
			}
		});

		it ("GET test with data", async () => {
			try {
				console.log("Before request");
				return request(server.server)
					.get("/items")
					.set("Accept", "application/json")
					.then((res) => {
						expect(res.status).to.be.equal(200);
						expect(res.body).to.be.equal([
							{
								name: "Coca Cola",
								description: "A 355 ml can of Coca Cola.",
								price: 0.50,
								category: "Fridge",
								img_url: "www.google.com",
								reservable: false,
								quantity_remaining: 6,
								low_stock_threshold: 2,
								last_restocked: Date.now() - 3 * 24 * 60 * 60 * 1000,
								max_quantity_per_transaction: 6
							},
							{
								name: "Bubly",
								description: "A 355 ml can of Bubly",
								price: 1.00,
								category: "Fridge",
								img_url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Bubly_logo_2018.png",
								reservabe: false,
								quantity_remaining: 6,
								low_stock_threshold: 2,
								last_restocked:Date.now() - 5 * 24 * 60 * 60 * 1000
							}
						]);
					});
			} catch (err) {
				console.log(err);
			}
		});
	});
});
