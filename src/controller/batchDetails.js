const BatchModel = require("../models/batch");


class BatchDetails {
    batchList (req, res) {
        let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let page = 0;
        let filters = ""
        if (req.query) {
            if(req.query.name){
                filters = req.query.name
            }
            if (req.query.page) {
                req.query.page = parseInt(req.query.page);
                page = Number.isInteger(req.query.page) ? req.query.page : 0;
            }
        }
        BatchModel.getAllBatch(limit, page, filters)
            .then((result) => {
                res.status(200).send(result);
            })
    }
    createNewBatch (req, res) {
        const batchData = {
            batchCode: req.body.batchCode,
            batchName: req.body.batchName
        }
        BatchModel.createBatch(batchData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }
    updateBatch (req, res) {
        let batchData = {
            batchCode: req.body.batchCode,
            batchName: req.body.batchName
        }
        BatchModel.updateBatchDetail(req.params.id, batchData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }


    deleteBatch (req, res) {
        BatchModel.deleteBatch(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}

module.exports = BatchDetails;