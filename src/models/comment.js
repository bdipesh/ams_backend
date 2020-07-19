const mongoose = require('../bin/connections')
const user =require("./user");
const notice=require("./notice");

const schemaComment={
    noticeId:{
        type: mongoose.SchemaTypes.String,
        ref: 'notice'
    },
    comment:{
        type:String
    },
    userid:{
        type:mongoose.SchemaTypes.String,
        ref:'user'
    },
    like:{
        type:String
    }
};

const collectionName = "comment";
const commentSchema = mongoose.Schema(schemaComment);
const Comment = mongoose.model(collectionName, commentSchema);

const createComment = (commentData) => {
    return new Promise((resolve, reject)=> {
        Comment.create(commentData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response);
            }
        })
    })
}

const getAllComment = (limit, offset, filters) => {
    let condition = filters?{noticeId: {"$regex": filters, "$options": "i"}}:{}
    return new Promise((resolve, reject) => {

        Comment.find({...condition})
            .populate('userid')
            .skip(offset)
            .limit(limit)
            .exec(function (err, notice) {
                if (err) {
                    reject(err);
                } else {
                    resolve(notice);
                }
            })
    })
}

module.exports={
    getAllComment,
    createComment
}