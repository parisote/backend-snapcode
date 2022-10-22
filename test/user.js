const { default: axios } = require("axios");

describe("User test",() => {
  it("GetUser Test", async () => {
    const path = 'http://localhost:3000/api/user/'+user_id
    const result = await axios.get(path);
    expect(result.status).toBe(200);
  });

  it("Following Test", async () => {
    const path = 'http://localhost:3000/api/user/following/'+user_id
    const result = await axios.get(path)
    expect(result.status).toBe(200);
  })

  it("Followers Test", async () => {
    const path = 'http://localhost:3000/api/user/followers/'+user_id
    const result = await axios.get(path)
    expect(result.status).toBe(200);
  })

  it("Followers Test", async () => {
    const path = 'http://localhost:3000/api/user/followers/'+user_id
    const result = await axios.get(path)
    expect(result.status).toBe(200);
  })

  it("Profile Update Test", async () => {
    const body = {
        name: "test",
        username: "testeo",
        biography: "soy un test",
        workingAt: "testInc",
        location: "internet",
        linkedIn: "/test",
        twitter: "/test"
    }
    const path = 'http://localhost:3000/api/user/profile/update/'+user_id
    const result = await axios.post(path,body)
    expect(result.status).toBe(201);
  })

  it("Profile Test", async () => {
    const path = 'http://localhost:3000/api/user/profile/'+user_id
    const result = await axios.get(path)
    expect(result.status).toBe(200);
  })

  it("Follow User Test", async () => {
    const path = 'http://localhost:3000/api/user/follow/'+user_id+'/7'
    const result = await axios.post(path)
    expect(result.status).toBe(201);
  })

  it("Like Post Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/user/'+user_id+'/like/post/'+post_id
    const result = await axios.post(path, '', config)
    expect(result.status).toBe(200);
  })

  it("Dislike Post Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/user/'+user_id+'/like/post/'+post_id
    const result = await axios.post(path, '', config)
    expect(result.status).toBe(200);
  })
})