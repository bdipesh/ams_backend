// use the path of your model
const Comment = require('../models/comment');
const user=require('../models/user')
const mongoose = require('mongoose');
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

describe('Comment Add', () => {
    it('Add comment testing', () => {
        const comment = {
            'noticeId': '05',
            'comment': 'kiran',
            'userid':'5f020ba6ab07b820e0a8586b'
        };
        return Comment.createComment(comment)
            .then((pro_ret) => {
                updateId = pro_ret._id
                expect(pro_ret.comment).toEqual('kiran');
            });
    });
})

describe("GET / - comment Details", () => {
    it("Comment get function test", async () => {
        await Comment.getAllComment(10,0,'')
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});
