const { default: axios } = require("axios");

describe("Post test", () => {
  it("Post Create OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {
      language: "asd2",
      code: "asd5",
      title: "asd6",
      tags: "java9",
      fileName: "asd"
    }

    const path = 'http://localhost:3000/api/post/' + user_id
    const result = await axios.post(path, body, config);
    post_id = result.data.id
    expect(result.status).toBe(201);
  });

  it("Get Post by ID OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/post/' + post_id
    const result = await axios.get(path, config);
    expect(result.status).toBe(200);
  });

  it("Get Post by USER OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/post/user/' + user_id
    const result = await axios.get(path, config);
    expect(result.status).toBe(200);
  });

  it("Get All Post OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/post'
    const result = await axios.get(path, config);
    expect(result.status).toBe(200);
  });

  it("Get Liked Posts by UserID OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/post/user/liked/' + user_id
    const result = await axios.get(path, config);
    expect(result.status).toBe(200);
  });

  it("Create Post FAIL", async () => {
    const body = {
      language: "asd2",
      theme: "asd3",
      options: "asd4",
      code: "asd5",
      text: "asd6",
      imageUrl: "asd7",
      videoUrl: "asd8",
      tags: "java9"
    }

    const path = 'http://localhost:3000/api/post/' + user_id

    await axios.post(path, body).catch(err => {
      expect(err.response.status).toBe(403)
    });
  })

  it("Get Leaderboard OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/trending'
    const result = await axios.get(path, config);
    expect(result.status).toBe(200);
  });

  it("Get Feed OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const path = 'http://localhost:3000/api/post/user/feed/' + user_id
    const result = await axios.get(path, config);
    expect(result.status).toBe(200);
  });
})