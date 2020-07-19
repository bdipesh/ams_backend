// use the path of your model
const Notice = require('../models/notice');
const User=require('../models/user')
const mongoose = require('mongoose');
let updateId = ''
// use the new name of the database
const url = 'mongodb://localhost:27017/testDatabase';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
describe("GET / - notice Details", () => {
    it("Notice get function test", async () => {
        const req = {
            limit: 10, offset:0
        }
        const res = {}
        await Notice.getAllNotice(10, 0)
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});

describe('Notice Add', () => {
    it('Add Notice testing', () => {
        const notice = {
            'notice': 'asdasdasd',
            'createdBy': '5f020ba6ab07b820e0a8586b',
            'like':'1',
            'file':'asd.pdf',
        };
        return Notice.createNotice(notice)
            .then((pro_ret) => {
                updateId = pro_ret._id
                expect(pro_ret.notice).toEqual('asdasdasd');
            });
    });

    it('to test the update', async () => {
        return Notice.updateNoticeDetail({_id: Object(updateId)}, {$set: {notice: 'asdadds'}})
            .then((pp) => {
                expect(pp.$set.notice).toEqual('asdadds')
            });

    });

// the code below is for delete testing
    it('to test the delete notice is working or not', async () => {
        const res = await Notice.deleteNotice({_id :Object(updateId)});
        expect(res._id.toString()).toBe(updateId.toString());
    });

})
