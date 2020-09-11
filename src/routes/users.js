const express = require('express');
const router = express.Router();
const userDetails = require('../controller/userDetails')
const { check, validationResult }  = require('express-validator');
const checkAuth =require( '../middleware/checkAuth')
const fileUpload = require('../middleware/imageUpload')
const authentication = require('../controller/authentication')
const upload = require("../middleware/uploads");
const handleLogin = new authentication();
const details = new userDetails();

router.get('/', details.userList);
router.get('/:id', [details.findOneUser]);
router.get('/detail/me',  handleLogin.getLoginUser);
router.delete('/:id', [details.deleteUser]);


const validateUser = () => {
    return [
        check('name').notEmpty().withMessage("Name field is required.")
            .not().isNumeric().withMessage("Name field should not contain Number."),
        // check('email').not().isEmpty().withMessage("Should not be empty")
        //     .isEmail().withMessage("Enter valid email"),
        check('password').not().isEmpty().withMessage("Password field is required.")
            .isLength({min:8}).withMessage("Password field must contain 8 charters.")
    ]
}

router.patch('/:id', fileUpload.any(),  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    } else {
        details.updateUsers(req, res)
    }
});
router.post('/', fileUpload.any(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            details.createUsers(req, res);
        }

    });
router.put('/:id', details.updatepassword);
router.post('/get-token', handleLogin.loginWithDetails);
router.post('/import/excel', upload.single('files'), (req, res) => {
    details.createManyUsers(req, res)
})
router.get('/import/sample', details.getSampleFile)


module.exports =  router;
