const  NoticeModel =require( "../models/notice");

class NoticeDetails {
    noticeList (req, res) {
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

        NoticeModel.getAllNotice(limit, page, filters)
            .then((result) => {
                res.status(200).json(
                    result
                );
            })
    }
    async createNewNotice (req, res) {
        const noticeData = {
            notice: req.body.notice,
            createdBy: req.body.createdBy,
            files: req.files || []
        }
        NoticeModel.createNotice(noticeData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }
    updateNotice (req, res) {
        const noticeData = {
            notice: req.body.notice
        }
        NoticeModel.updateNoticeDetail(req.params.id, noticeData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }
    likeNotice (req, res) {
        const noticeData = {
            like: req.body.like,
            likedUser: req.body.likedUser
        }
        console.log(req.body)
        NoticeModel.updateNoticeDetail(req.params.id, noticeData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }

    deleteNotice (req, res) {
        NoticeModel.deleteNotice(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}

module.exports= NoticeDetails;