const multer = require("multer");

const excelFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")
    ) {
        cb(null, true);
    } else {
        cb("Please upload only excel file.", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('here')
        cb(null, '../my-uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    },
});

const uploadFile = multer({ dest: './uploads/' });
module.exports = uploadFile;