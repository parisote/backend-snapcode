const { default: axios } = require("axios");
const { expect, assert } = require("chai");

const app = require('../src/app');
let server

before(done => {
  server = app.listen(3000, done);
});

describe("Ping Test", function () {
  it("Ping pong", async () => {
    const path = 'http://localhost:3000/ping'
    const result = await axios.get(path);
    expect(result.status).to.equal(200);
  });
});

after(done => {
  server.close(done);
});