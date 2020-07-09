const express =require( 'express');
const router = express.Router();
const attendanceDetails =require( '../controller/attendanceDetails')
const { check, validationResult } =require( 'express-validator')
const checkAuth =require( '../middleware/checkAuth')
const details = new attendanceDetails()



router.get('/', details.getAllAttendance());
router.delete('/:id', details.deleteAttendance);


router.put('/:id',  details.updateAttendanceDetail());
router.post('/',
    details.createAttendance());
router.get('/student',
    details.getAttendanceByUser());
router.get('/course',
    details.getAttendanceByCourse());

module.exports= router;
