const { default: axios } = require("axios");

describe("Profile test", () => {
    it("Create profile", async () => {
        const profile = {
            name: "algo",
            username: "algo",
            biography: "",
            workingAt: "",
            location: "",
            linkedIn: "",
            twitter: ""
        }
        const path = 'http://localhost:3000/api/user/profile/update/1'
        const result = await axios.post(path, profile);
        expect(result.status).toBe(201);
    });

    it("Get Profile by name OK", async () => {
        const path = 'http://localhost:3000/api/user/profile/search/algo'
        const result = await axios.get(path);
        expect(result.status).toBe(200);
    });
})