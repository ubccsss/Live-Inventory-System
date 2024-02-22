/* eslint-disable no-unused-expressions */
import {expect} from "chai";
import CsssUserQuery from "../../../src/db/queries/CsssUserQuery";
import * as TestItems from "../test_objs/CsssUser";
import {testCreate, testDelete, testRead, testReadAll, testUpdate} from "./SimpleCrudQueryable";
import {CsssUserInitializer, CsssUserMutator} from "../../../src/types/db/public/CsssUser";

const testCsssInitializer: CsssUserInitializer = {
	email: "peppa@peppa.pig",
	password: "hashi",
	first_name: "Peppa",
	last_name: "Pig",
	phone_number: "9998887777"
};

describe("CsssUser Query Tests", () => {

	testCreate(CsssUserQuery, {
		testInitializer: testCsssInitializer,
		getId: (q) => q.user_id
	});

	testRead(CsssUserQuery, {
		testId: TestItems.csssUserJane.user_id,
		testQueryable: TestItems.csssUserJane,
		nonexistentId: -1
	});

	testReadAll(CsssUserQuery, Object.values(TestItems));

	const csssMutator: CsssUserMutator = {
		email: "george@peppa.pig",
		first_name: "George",
		password: "hashhash"
	};
	testUpdate(CsssUserQuery, {
		testInitializer: testCsssInitializer,
		testMutator: csssMutator,
		nonexistentId: -1,
		getId: (q) => q.user_id
	});

	testDelete(CsssUserQuery, {
		testInitializer: testCsssInitializer,
		nonexistentId: -1,
		getId: (q) => q.user_id
	});

	describe("authenticateUser()", () => {
		it("returns user with matching credentials", async () => {
			expect(await CsssUserQuery.authenticateUser("george@ubccsss.org", "hash2"))
				.to.deep.equal(TestItems.csssUserGeorge);
		});
		it("returns null when username matches but password is incorrect", async () => {
			expect(await CsssUserQuery.authenticateUser("george@ubccsss.org", "wrong")).to.be.null;
		});
		it("returns null when neither username nor password match", async () => {
			expect(await CsssUserQuery.authenticateUser("fake", "incorrect")).to.be.null;
		});
	});
});
