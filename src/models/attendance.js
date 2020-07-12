const mongoose =require( '../bin/connections')
const user =require("./user");

const schemaAttendance = {
    studentId:
        {
            type: mongoose.SchemaTypes.String,
            ref: 'user'
        },
    batchId: {
        type: mongoose.SchemaTypes.String,
        ref: 'batch'
    },
    courseId: {
        type: mongoose.SchemaTypes.String,
        ref: 'course'
    },
    status: {
        type: mongoose.SchemaTypes.String,
        enum: ['Present', 'Absent']
    },
    date: {
        type: Date,
        default: Date.now()
    }


};
const collectionName = "attendance";
const attendanceSchema = new mongoose.Schema(schemaAttendance);
const Attendance = mongoose.model(collectionName, attendanceSchema);

const getAllAttendance = (perPage, page, filters) => {
    return new Promise((resolve, reject) => {
        Attendance.find()
            .limit(perPage)
            .skip(page)
            .exec(function (err, attendances) {
                if (err) {
                    reject(err);
                } else {
                    resolve(attendances);
                }
            })
    })

}

const getAttendanceByUser = (filters = null) => {
    const course = filters &&  filters.course  ? { courseId: {$in: filters.course}} : {}
    const batch = filters && filters.batch ? { batchId: {"$regex": filters.batch, "$options": "i"}} : {}
    const student = filters && filters.student ? { studentId: {$in: filters.student}} : {}
    return new Promise((resolve, reject) => {
        Attendance.find({...course, ...batch, ...student})
            .populate('studentId')
            .limit(100)
            .then((response) => {
                resolve(response)
            }).catch((error) => {
            reject(error)
        })
    })
}
const getAttendanceByCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        Attendance.findOne({courseId: courseId})
            .populate('batchId', 'courseId', 'studentId')
            .then((response) => {
                resolve(response)
            }).catch((error) => {
            reject(error)
        })
    })
}


const createAttendance = (attendanceData) => {
    return new Promise((resolve, reject)=> {
        Attendance.create(attendanceData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })
}
const updateAttendanceDetail = (attendanceId, attendanceData) => {
    return new Promise((resolve, reject)=> {
        Attendance.findByIdAndUpdate(attendanceId, attendanceData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(attendanceData)
            }
        });
    })
}

const deleteAttendance = (attendanceId) => {
    return new Promise((resolve, reject)=> {
        Attendance.findByIdAndRemove(attendanceId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}

module.exports = {
    deleteAttendance,
    updateAttendanceDetail,
    createAttendance,
    getAttendanceByCourse,
    getAttendanceByUser,
    getAllAttendance
}