const express =require('express');
const router = express.Router();
const batchDetails =require( '../controller/batchDetails')
const { check, validationResult } =require( 'express-validator')
const checkAuth =require('../middleware/checkAuth')
const details = new batchDetails()



router.get('/', [details.batchList]);
router.delete('/:id', [details.deleteBatch]);

const validateBatch = () => {
    return [
        check('batchCode').notEmpty().withMessage("Batch code field is required."),
        check('batchName', "Batch field must be required").not().isEmpty(),
    ]
}

router.put('/:id', validateBatch(),  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    } else {
        details.updateBatch(req, res)
    }
});
router.post('/',
    checkAuth,
    validateBatch(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            details.createNewBatch(req, res);
        }

    });

module.exports = router;
