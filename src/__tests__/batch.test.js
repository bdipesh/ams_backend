// use the path of your model
const Batch = require('../models/batch');
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
describe("GET / - batch Details", () => {
    it("Batch get function test", async () => {
        const req = {
            limit: 10, offset:0
        }
        const res = {}
        await Batch.getAllBatch(req, res)
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});

describe('Batch Add', () => {
    it('Add batch testing', () => {
        const batch = {
            'batchCode': '05',
            'batchName': 'kiran',

        };
        return Batch.createBatch(batch)
            .then((pro_ret) => {
                updateId = pro_ret._id
                expect(pro_ret.batchName).toEqual('kiran');
            });
    });

    it('to test the update', async () => {
        return Batch.updateBatchDetail({_id :Object(updateId)}, {$set : {batchName:'dipesh'}})
            .then((pp)=>{
                expect(pp.$set.batchName).toEqual('dipesh')
            })

    });

// the code below is for delete testing
    it('to test the delete batch is working or not', async () => {
        const res = await Batch.deleteBatch({_id :Object(updateId)});
        expect(res._id.toString()).toBe(updateId.toString());
});

})
