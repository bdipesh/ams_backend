const mongoose = require('../bin/connections')
const user =require("./user");
const notice=require("./notice");

const schemaComment={
    noticeid:{
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

const getAllComment = (limit) => {
    return new Promise((resolve, reject) => {
        Comment.find()
            .populate('userid')
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