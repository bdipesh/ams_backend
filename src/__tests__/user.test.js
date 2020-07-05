const user = require("../models/user");

describe("GET / - User Details", () => {
    it("User get function test", async () => {
        await user.getAllUsers(10, 0, null)
            .then((response)=> {
                expect(response.status).toBe("200");
            })
    });
});
describe("Create / - User Details", () => {
    it("User create function test", async () => {
        const userData = {
            name: 'Dipesh Basnet',
            role: 'Admin'
        }
        await user.createUser(userData)
            .then((response)=> {
                expect(response.status).toBe("201");
            })
    });
});