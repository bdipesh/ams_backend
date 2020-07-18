const  CommentModel =require( "../models/comment");

class commentDetails {
    commentList (req, res) {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        // let page = 0;
        let filters = ""
        if (req.query) {
            if(req.query.noticeId){
                filters = req.query.noticeId
            }
        }

        CommentModel.getAllComment(limit, offset, filters)
            .then((result) => {
                res.status(200).json(
                    result
                );
            })
    }
    async createNewComment (req, res) {
        const commentData = {
            comment: req.body.comment,
            noticeId: req.body.noticeId,
            userid:req.body.userid
        }
        CommentModel.createComment(commentData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }




}

module.exports= commentDetails;