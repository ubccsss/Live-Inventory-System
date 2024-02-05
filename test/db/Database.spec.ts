import {expect} from "chai";

describe("Database tests", function() {

	describe("Database test section 1", function() {
		it("Expect 1 should be 1", function() {
			return expect(1).to.be.equal(1);
		});
	});

	describe("Database test section 2", function() {
		it("Expect 2 to be 2", function() {
			return expect(2).to.be.equal(2);
		});
	});

});
