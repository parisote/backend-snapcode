const { default: axios } = require("axios");

describe("Trending test", () => {
  it("Get Trending OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/trending'
    const result = await axios.get(path, config);

    console.log(result.data)

    expect(result.status).toBe(200);
  })
})