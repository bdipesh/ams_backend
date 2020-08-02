// use the path of your model
const userModel = require('../models/user');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/testDatabase';
let updateId = ''
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});
describe("GET / - User Details", () => {
    it("User get function test", async () => {
        const res = {}
        await userModel.getAllUsers(10)
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});

describe('User Add', () => {
    it('Add Course testing', () => {
        const user = {
            "batch":"",
            "course":"",
            "name":"Dipesh Basnet",
            "email":"dipesh@gmail.com",
            "password":"hellonepal",
            "dob":"2/3/2020",
            "gender":"Male",
            "phone":"99999999",
            "role":"Teacher"
        };
        return userModel.createUser(user)
            .then((response) => {
                updateId = response._id
                expect(response.name).toEqual('Dipesh Basnet');
            });
    });

    it('to test the update', async () => {
        return userModel.updateUserDetail({_id :Object(updateId)}, {$set : {name:'Dipesh'}})
            .then((response)=>{
                console.log(response)
                expect(response.$set.name).toEqual('Dipesh')
            })

    });

    it('to test the update password', async () => {
        return userModel.updatePassword({_id :Object(updateId)}, {$set : {password:'asdasd'}})
            .then((response)=>{
                console.log(response)
                expect(response.$set.password).toEqual('asdasd')
            })

    });

// the code below is for delete testing
    it('to test the delete book is working or not', async () => {
        const status = await userModel.deleteUser({_id :Object(updateId)});
        expect(status._id.toString()).toBe(updateId.toString());
    });

})
