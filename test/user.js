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
    const path = 'http://localhost:3000/api/user/follow/'+user_id+'/'+user_id_second
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

  it("Like Post Test FAIL USER", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/user/'+0+'/like/post/'+post_id
    await axios.post(path,'',config).catch(err => {
      expect(err.response.status).toBe(404)
    });
  })

  it("Like Post Test FAIL POST", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/user/'+user_id+'/like/post/'+0
    await axios.post(path,'',config).catch(err => {
      expect(err.response.status).toBe(404)
    });
  })

  it("Get timeline OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/user/'+user_id+'/timeline'
    const result = await axios.get(path, config);
    expect(result.status).toBe(200);
  });

})