const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors =  require('cors')
const courseRoutes = require('../src/routes/course')
const batchRoutes = require('../src/routes/batch')
const userRoutes = require('../src/routes/users')
const attendanceRoutes = require('../src/routes/attendance')
// const noticeRoutes = require('../src/routes/notice')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use('/static', express.static('uploads'));
app.use(express.static(path.join(__dirname, '../uploads')));


// app.use('/api/v1/root', swaggerUi.serve, swaggerUi.setup(swaggerDocument
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/batch', batchRoutes);
app.use('/api/v1/course', courseRoutes);
// app.use('/api/v1/notice', noticeRoutes);
app.use('/api/v1/attendance', attendanceRoutes);

module.exports = app;
