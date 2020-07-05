// use the path of your model
const Course = require('../models/course');
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
describe("GET / - course Details", () => {
    it("course get function test", async () => {
        const req = {
            limit: 10, offset:0
        }
        const res = {}
        await Course.getAllCourse(req, res)
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});

describe('Course Add', () => {
// the code below is for insert testing
    it('Add Course testing', () => {
        const course = {
            'courseCode': '01',
            'courseName': 'asdasd',

        };

        return Course.createCourse(course)
            .then((pro_ret) => {
                expect(pro_ret.courseName).toEqual('asdasd');
            });
    });

    // it('to test the update', async () => {
    //     return Course.updateCourseDetail({_id :Object('5e48ef6bb706075b0c87f7c1')}, {$set : {courseName:'basd'}})
    //         .then((pp)=>{
    //             expect(pp.courseName).toEqual('basd')
    //         })
    //
    // });

// the code below is for delete testing
//     it('to test the delete book is working or not', async () => {
//         const status = await Course.deleteCourse();
//         expect(status.ok).toBe(1);
// });

})
