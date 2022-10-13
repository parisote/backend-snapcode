const { default: axios } = require("axios");

const app = require('../src/app');
let server

beforeAll(done => {
    server = app.listen(3000, done);
  });

test("Register Test OK", async () => {
    const body = { email: "test@test.com", password: "123" }

    const path = 'http://localhost:3000/api/auth/register'
    const result = await axios.post(path, body);
    expect(result.status).toBe(201);
});

test("Register Test FAIL EMAIL", async () => {
    const body = { email: "test", password: "123" }

    const path = 'http://localhost:3000/api/auth/register'
    await axios.post(path, body).catch(err => {
        expect(err.response.status).toBe(403)
      });
});

test("Register Test FAIL USER", async () => {
    const body = { email: "test@test.com", password: "123" }

    const path = 'http://localhost:3000/api/auth/register'
    await axios.post(path, body).catch(err => {
        expect(err.response.status).toBe(400)
      });
});

afterAll(done => {
  server.close(done);
});