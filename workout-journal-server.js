const express = require('express')
const cors = require('cors')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
})

const upload = multer({ storage: storage })

const app = express()

app.use(cors())

app.post('/uploadfile', upload.single('default-workout-set.json'), function (req, res, next) {
    res.json({ msg: 'File uploaded successfully!' })
})

app.post('/uploadDayFile', upload.single('completed-workout-set.json'), function (req, res, next) {
    res.json({ msg: 'File uploaded successfully!' })
})

app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 80')
})

app.get('/downloadFile', function (req, res) {
    const file = path.join(__dirname + `/uploads/default-workout-set.json`);
    res.sendFile(file);
});

app.get('/downloadAllExercise', function (req, res) {
    const file = path.join(__dirname + `/uploads/completed-workout-set.json`);
    res.sendFile(file);
});