const { default: axios } = require("axios");

let post_id = 0;

describe("Post test",() => {
  it("Post Create OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const body = {
      language: "asd2",
      code: "asd5",
      title: "asd6",
      tags: "java9",
      fileName: "asd"
    }

    const path = 'http://localhost:3000/api/post/1'
    const result = await axios.post(path, body,config);
    post_id = result.data.id
    expect(result.status).toBe(201);
  });

  it("Get Post by ID OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/post/'+post_id
    const result = await axios.get(path,config);
    expect(result.status).toBe(200);
  });

  it("Get Post by USER OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/post/user/1'
    const result = await axios.get(path,config);
    expect(result.status).toBe(200);
});

  it("Get All Post OK", async () => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    const path = 'http://localhost:3000/api/post'
    const result = await axios.get(path,config);
    expect(result.status).toBe(200);
  });

  it("Get Liked Posts by UserID OK", async () => {
    const path = 'http://localhost:3000/api/post/user/liked/1'
    const result = await axios.get(path);
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

      const path = 'http://localhost:3000/api/post/1'

      await axios.post(path, body).catch(err => {
          expect(err.response.status).toBe(403)
        });
  })
})