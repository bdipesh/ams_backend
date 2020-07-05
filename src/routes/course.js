const  express = require('express');
const router = express.Router();
const courseDetails = require('../controller/courseDetails')
const { check, validationResult } = require('express-validator')
const  checkAuth = require('../middleware/checkAuth')
const details = new courseDetails()



router.get('/', [details.courseList]);
router.delete('/:id', [details.deleteCourse]);

const validateCourse = () => {
    return [
        check('courseCode').notEmpty().withMessage("Course code field is required."),
        check('courseName', "Course field must be required").not().isEmpty(),
    ]
}

router.put('/:id', validateCourse(),  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    } else {
        details.updateCourse(req, res)
    }
});
router.post('/',
    checkAuth,
    validateCourse(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            details.createNewCourse(req, res);
        }

    });

export default router;
