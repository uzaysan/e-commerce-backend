import chai from "chai";
import chaihttp from "chai-http";
import app from "../app.js";

const expect = chai.expect;
chai.use(chaihttp);

describe("Hello Neo! test", () => {
  it("returns Hello Neo! for the default endpoint with GET method", async () => {
    const response = await chai.request(app).get("/");
    expect(response.text).to.equal("Hello Neo!");
  });
});
