const mongoose =require('../bin/connections')

const schemaNotice = {
    notice: {
        type: String,
        default: ''
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    file: [{type: String}],
    feedBack: [{
        users: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        feedback: {
            type: String,
        }}
    ]
};
const collectionName = "notice";
const noticeSchema = new mongoose.Schema(schemaNotice);
const Notice = mongoose.model(collectionName, noticeSchema);


const getAllNotice = (perPage, page, filters) => {
    return new Promise((resolve, reject) => {
        Notice.find()
            .populate('createdBy')
            .skip(page)
            .exec(function (err, notice) {
                if (err) {
                    reject(err);
                } else {
                    resolve(notice);
                }
            })
    })

}


const createNotice = (noticeData) => {
    return new Promise((resolve, reject)=> {
        Notice.create(noticeData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })

}

const updateNoticeDetail = (noticeId, noticeData) => {
    return new Promise((resolve, reject)=> {
        Notice.findByIdAndUpdate(noticeId, noticeData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

const deleteNotice = (noticeId) => {
    return new Promise((resolve, reject)=> {
        Notice.findByIdAndRemove(noticeId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}
module.exports= {
    deleteNotice,
    updateNoticeDetail,
    getAllNotice,
    createNotice
}

