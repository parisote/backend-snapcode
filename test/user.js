const { default: axios } = require("axios");
const { randFirstName } = require('@ngneat/falso');

describe("User test",() => {
  it("GetUser Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/user/'+user_id
    const result = await axios.get(path,config);
    expect(result.status).toBe(200);
  });

  it("Following Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/user/following/'+user_id
    const result = await axios.get(path,config)
    expect(result.status).toBe(200);
  })

  it("Followers Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/user/followers/'+user_id
    const result = await axios.get(path,config)
    expect(result.status).toBe(200);
  })

  it("Followers Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/user/followers/'+user_id
    const result = await axios.get(path,config)
    expect(result.status).toBe(200);
  })

  it("Profile Update Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    username = randFirstName()
    const body = {
        name: "test",
        username: username,
        biography: "soy un test",
        workingAt: "testInc",
        location: "internet",
        linkedIn: "/test",
        twitter: "/test"
    }
    const path = 'http://localhost:3000/api/user/profile/update/'+user_id
    const result = await axios.post(path,body,config)
    expect(result.status).toBe(201);
  })

  it.skip("Get Profile by name OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/user/profile/search/'+username
    const result = await axios.get(path,config);
    expect(result.status).toBe(200);
});

  it("Profile Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/user/profile/'+user_id
    const result = await axios.get(path,config)
    expect(result.status).toBe(200);
  })

  it("Follow User Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/user/follow/'+user_id+'/'+user_id_second
    const result = await axios.post(path, '', config)
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

  it("Like Comment Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/user/'+user_id+'/like/comment/'+comment_id
    const result = await axios.post(path, '', config)
    expect(result.status).toBe(200);
  })

  it("Dislike Comment Test", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/user/'+user_id+'/like/comment/'+comment_id
    const result = await axios.post(path, '', config)
    expect(result.status).toBe(200);
  })

  it("Like Comment Test FAIL USER", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/user/'+0+'/like/comment/'+comment_id
    await axios.post(path,'',config).catch(err => {
      expect(err.response.status).toBe(404)
    });
  })

  it("Like Comment Test FAIL POST", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/user/'+user_id+'/like/comment/'+0
    await axios.post(path,'',config).catch(err => {
      expect(err.response.status).toBe(404)
    });
  })

})