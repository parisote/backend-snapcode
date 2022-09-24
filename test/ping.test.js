const { default: axios } = require("axios");
const { expect, assert } = require("chai");

describe("Ping Test", function () {
  it("Ping pong", async () => {
    const path = 'http://localhost:4000/ping'
    const result = await axios.get(path);
    expect(result.status).to.equal(200);
  });
});