const  AttendanceModel =require( "../models/attendance");
const {Request, Response} =require( "express");

class AttendanceDetails {
    attendanceList (req, res) {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let page = 0;
        let filters = "";
        if (req.query) {
            if(req.query.name){
                filters = req.query.name
            }
            if (req.query.page) {
                req.query.page = parseInt(req.query.page);
                page = Number.isInteger(req.query.page) ? req.query.page : 0;
            }
        }
        AttendanceModel.getAllAttendance(limit, page, filters)
            .then((result) => {
                res.status(200).json({
                    count: result.length,
                    next: result.length === limit ? '' : '',
                    prev: '',
                    result: result
                });
            })
    }
    attendanceUserList (req, res) {
        const filter = {
            course: req.query.course || '',
            batch: req.query.batch || '',
            student: req.query.student || '',
            start_date: req.query.start_date || '',
            end_date: req.query.end_date || ''
        }
        AttendanceModel.getAttendanceByUser(filter)
            .then((result) => {
                res.status(200).json(result);
            })
    }
    attendanceCourseList (req, res) {
        AttendanceModel.getAttendanceByUser(req.body.courseId)
            .then((result) => {
                res.status(200).json({
                    result: result
                });
            })
    }
    async createNewAttendance (req, res) {
        const attendanceData = {
            studentId: req.body.student,
            courseId: req.body.course,
            batchId: req.body.batch,
            status: req.body.status
        }
        AttendanceModel.createAttendance(attendanceData)
            .then((result) => {
                res.status(201).json(result);
            });
    }
    updateAttendance (req, res) {
        const attendanceData = {
            status: req.body.status
        }
        AttendanceModel.updateAttendanceDetail(req.params.id, attendanceData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }


    deleteAttendance (req, res) {
        AttendanceModel.deleteAttendance(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}

module.exports = AttendanceDetails;