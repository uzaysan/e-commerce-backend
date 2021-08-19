import chai from "chai";
import chaihttp from "chai-http";
import app from "../app.js";
import DatabaseAdapter from "../src/adapters/DatabaseAdapter.js";

const expect = chai.expect;
chai.use(chaihttp);

describe("products", () => {
  before(async () => {
    return await DatabaseAdapter.connectToDatabase();
  });

  it("should return 400 with invalid object id", async () => {
    const response = await chai
      .request(app)
      .get("/api/product/invalidObjectId");
    expect(response.status).to.equal(400);
  });

  it("should return product with object Id", async () => {
    const response = await chai.request(app).get("/api/product/11t64vb0bq");
    expect(response.status).to.equal(200);
    const product = response.body;
    expect(product["_id"]).to.exist;
    expect(product["title"]).to.exist;
    expect(product["description"]).to.exist;
    expect(product["category"]).to.exist;
    expect(product["price"]).to.exist;
    expect(product["image"]).to.exist;
    expect(product["user"]).to.exist;
    expect(product["_id"]).to.be.a("string");
    expect(product["title"]).to.be.a("string");
    expect(product["description"]).to.be.a("string");
    expect(product["category"]).to.be.a("string");
    expect(product["image"]).to.be.a("string");
    expect(product["price"]).to.be.a("number");
    expect(product["user"]).to.be.a("object");
    const user = product["user"];
    expect(user["_id"]).to.exist;
    expect(user["name"]).to.exist;
    expect(user["_id"]).to.be.a("string");
    expect(user["name"]).to.be.a("string");
  });
});
