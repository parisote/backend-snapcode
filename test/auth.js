const { default: axios } = require("axios");

describe("Auth test",() => {
  it("Register Test OK", async () => {
      const body = { email: "testeo@test.com", password: "123" }

      const path = 'http://localhost:3000/api/auth/register'
      const result = await axios.post(path, body);
      expect(result.status).toBe(201);
  });

  it("Register Test FAIL EMAIL", async () => {
      const body = { email: "test", password: "123" }

      const path = 'http://localhost:3000/api/auth/register'
      await axios.post(path, body).catch(err => {
          expect(err.response.status).toBe(403)
        });
  });

  it("Register Test FAIL USER", async () => {
      const body = { email: "test@test.com", password: "123" }

      const path = 'http://localhost:3000/api/auth/register'
      await axios.post(path, body).catch(err => {
          expect(err.response.status).toBe(400)
        });
  })

  it("Login USER", async () => {
    const body = { email: "test@test.com", password: "123" }

    const path = 'http://localhost:3000/api/auth/login'
    const result = await axios.post(path, body)
    token = result.data.token
    expect(result.status).toBe(200);
  })
})