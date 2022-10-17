const { default: axios } = require("axios");

let post_id = 0;

describe("Post test",() => {
  it("Post Create OK", async () => {
      const body = {
          value: "asd1",
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
      const result = await axios.post(path, body);
      post_id = result.data.id
      expect(result.status).toBe(201);
  });

  it("Get Post by ID OK", async () => {
      const path = 'http://localhost:3000/api/post/'+post_id
      const result = await axios.get(path);
      expect(result.status).toBe(200);
  });

  it("Get Post by USER OK", async () => {
    const path = 'http://localhost:3000/api/post/user/1'
    const result = await axios.get(path);
    expect(result.status).toBe(200);
});

  it("Get All Post OK", async () => {
      const path = 'http://localhost:3000/api/post'
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