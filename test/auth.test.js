const { default: axios } = require("axios");

const app = require('../src/app');
let server

beforeAll(done => {
    server = app.listen(3000, done);
  });

test("Register Test", async () => {
    const body = { email: "test@test.com", password: "123" }

    const path = 'http://localhost:3000/api/auth/register'
    const result = await axios.post(path, body);
    expect(result.status).toBe(201);
});

afterAll(done => {
  server.close(done);
});