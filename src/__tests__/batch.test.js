// use the path of your model
const Batch = require('../models/batch');
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
// the code below is for insert testing
    it('Add batch testing', () => {
        const batch = {
            'batchCode': '01',
            'batchName': 'asdasd',

        };
        return Batch.createBatch(batch)
            .then((pro_ret) => {
                expect(pro_ret.batchName).toEqual('asdasd');
            });
    });

    // it('to test the update', async () => {
    //     return Batch.updateBatchDetail({_id :Object('5f02151869f48a417ce5fe10')}, {$set : {batchName:'asd'}})
    //         .then((pp)=>{
    //             expect(pp.batchName).toEqual('asd')
    //         })
    //
    // });

// the code below is for delete testing
//     it('to test the delete batch is working or not', async () => {
//         const status = await Batch.deleteBatch();
//         expect(status.ok).toBe(1);
// });

})
