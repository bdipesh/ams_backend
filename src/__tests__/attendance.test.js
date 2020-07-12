// use the path of your model
const Attendance = require('../models/attendance');
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
describe("GET / - attendance Details", () => {
    it("Attendance get function test", async () => {
        await Attendance.getAllAttendance(10, 0)
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});

describe("GET / - attendance Details per User", () => {
    it("Attendance get function test", async () => {
        await Attendance.getAttendanceByUser('5f021920e39f3b3fd899203d', '5f0287fa7798ab295c94939d')
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});

describe("GET / - attendance Details per Course", () => {
    it("Attendance get function test", async () => {
        await Attendance.getAttendanceByCourse('5f021920e39f3b3fd899203d')
            .then((response)=> {
                expect(typeof response).toBe('object');
            })
    });
});

describe('Attendance taking', () => {
    it('Add Attendance taking', () => {
        const attendance = {
            'studentId': '5f021920e39f3b3fd899203d',
            'batchId': '5f028ac97798ab295c94939e',
            'courseId':'5f0287fa7798ab295c94939d',
            'status':'Present',
            'date':'2076-01-01'
        };
        return Attendance.createAttendance(attendance)
            .then((pro_ret) => {
                updateId = pro_ret._id
                expect(pro_ret.status).toEqual('Present');
            });
    });


    it('to test the update', async () => {
        return Attendance.updateAttendanceDetail({_id :Object(updateId)}, {$set : {status:'Absent'}})
            .then((response)=>{
                console.log(response)
                expect(response.$set.status).toEqual('Absent')
            })

    });

// the code below is for delete testing
    it('to test the delete attendance is working or not', async () => {
        const res = await Attendance.deleteAttendance({_id :Object(updateId)});
        expect(res._id.toString()).toBe(updateId.toString());
    });

})
