const { default: axios } = require("axios");

const app = require('../src/app');
let server

beforeAll(done => {
    server = app.listen(3000, done);
  });

test("Post Create OK", async () => {
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
    expect(result.status).toBe(201);
});

test("Get Post OK", async () => {
    const path = 'http://localhost:3000/api/post/1'
    const result = await axios.get(path);
    expect(result.status).toBe(200);
});

test("Get All Post OK", async () => {
    const path = 'http://localhost:3000/api/post'
    const result = await axios.get(path);
    expect(result.status).toBe(200);
});

test("Create Post FAIL", async () => {
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
});

afterAll(done => {
  server.close(done);
});