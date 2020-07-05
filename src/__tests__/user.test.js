const UserModel = require("../models/user");


describe("GET / - User Details", () => {
    it("User get function test", async () => {
        const req = {
            limit: 10, offset:0
        }
        const res = {}
        await UserModel.getAllUsers(req, res)
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});
describe("Create / - User Details", () => {
    it("User create function test", async () => {
        const userData = {
            name: 'Dipesh Basnet',
            role: 'User'
        }
        await UserModel.createUser(userData)
            .then((response)=> {
                expect(response.status).toBe("201");
            })
    });
});