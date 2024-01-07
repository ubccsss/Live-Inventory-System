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
	});
});
