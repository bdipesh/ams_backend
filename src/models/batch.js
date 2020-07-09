const mongoose = require('../bin/connections')

const schemaBatch = {
    batchCode: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    batchName: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
};
const collectionName = "batch";
const batchSchema = mongoose.Schema(schemaBatch);
const Batch = mongoose.model(collectionName, batchSchema);


const getAllBatch = (perPage, page, filters) => {
    return new Promise((resolve, reject) => {
        Batch.find()
            .limit(parseInt(perPage))
            .skip(parseInt(page))
            .exec(function (err, batch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(batch);
                }
            })
    })

}


const createBatch = (batchData) => {
    return new Promise((resolve, reject)=> {
        Batch.create(batchData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response);
            }
        })

    })

}

const updateBatchDetail = (batchId, batchData) => {
    return new Promise((resolve, reject)=> {
        Batch.findByIdAndUpdate(batchId, batchData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(batchData)
            }
        });
    })
}

const deleteBatch = (batchId) => {
    return new Promise((resolve, reject)=> {
        Batch.findByIdAndRemove(batchId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}
module.exports = {
    deleteBatch,
    updateBatchDetail,
    createBatch,
    getAllBatch
}

