const express =require('express');
const router = express.Router();
const commentDetails =require( '../controller/commentDetails')
const { check, validationResult } =require('express-validator')
const checkAuth =require('../middleware/checkAuth')
const details = new commentDetails()


router.get('/', [details.commentList]);

const validateComment = () => {
    return [
        check('comment', "Comment field must be required").not().isEmpty(),
    ]
}


router.post('/',
    checkAuth,
    validateComment(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            details.createNewComment(req, res);
        }

    });

module.exports = router;
