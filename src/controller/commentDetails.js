const  CommentModel =require( "../models/comment");
const {Request, Response} =require( "express");
const common =require( "../middleware/common");

class commentDetails {
    commentList (req, res) {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
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

        CommentModel.getAllComment(limit, page, filters)
            .then((result) => {
                res.status(200).json(
                    result
                );
            })
    }
    async createNewComment (req, res) {
        const commentData = {
            comment: req.body.comment,
            noticeid: req.body.noticeid,
            userid:req.body.userid,
            like:req.body.like
        }
        CommentModel.createComment(commentData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }




}

module.exports= commentDetails;