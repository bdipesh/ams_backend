const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1000 * 1000 }
})


module.exports = upload;


