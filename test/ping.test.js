const { default: axios } = require("axios");

const app = require('../src/app');
let server

beforeAll(done => {
  server = app.listen(3000, done);
});

test("Ping Test", async () => {
  const path = 'http://localhost:3000/api/ping'
  const result = await axios.get(path);
  expect(result.status).toBe(200);
});

test("Ping Test Fail", async () => {
  const path = 'http://localhost:3000/api/sarasa'
  await axios.get(path).catch(err => {
    expect(err.response.status).toBe(404)
  });
});

test("Ping Api Docs", async () => {
  const path = 'http://localhost:3000/api-docs'
  const result = await axios.get(path);
  expect(result.status).toBe(200);
});

afterAll(done => {
  server.close(done);
});