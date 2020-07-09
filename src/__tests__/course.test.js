// use the path of your model
const Course = require('../models/course');
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
describe("GET / - course Details", () => {
    it("course get function test", async () => {
        const res = {}
        await Course.getAllCourse(10)
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});

describe('Course Add', () => {
    it('Add Course testing', () => {
        const course = {
            'courseCode': '01',
            'courseName': 'asdasd',

        };

        return Course.createCourse(course)
            .then((pro_ret) => {
                updateId = pro_ret._id
                expect(pro_ret.courseName).toEqual('asdasd');
            });
    });

    it('to test the update', async () => {
        return Course.updateCourseDetail({_id :Object(updateId)}, {$set : {courseName:'basd'}})
            .then((pp)=>{
                expect(pp.$set.courseName).toEqual('basd')
            })

    });

// the code below is for delete testing
    it('to test the delete book is working or not', async () => {
        const status = await Course.deleteCourse({_id :Object(updateId)});
        expect(status._id.toString()).toBe(updateId.toString());
});

})
