const express =require( 'express');
const router = express.Router();
const attendanceDetails =require( '../controller/attendanceDetails')
const { check, validationResult } =require( 'express-validator')
const checkAuth =require( '../middleware/checkAuth')
const details = new attendanceDetails()

router.get('/', details.attendanceList);
router.delete('/:id', details.deleteAttendance);

router.put('/:id',  details.updateAttendance);
router.post('/',
    details.createNewAttendance);
router.get('/student',
    details.attendanceUserList);
router.get('/course',
    details.attendanceCourseList);

module.exports= router;
