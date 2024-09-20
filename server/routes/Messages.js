const express= require('express')
const messagesRouter = express.Router();
const { verifyToken } = require('../middlewares/Auth');
const { getMessages, uploadFile } = require('../controllers/Messages');
const multer = require('multer');

const upload = multer({dest:"uploads/files"})

messagesRouter.post('/get-messages',verifyToken,getMessages)
messagesRouter.post('/upload-file',verifyToken,upload.single("file"),uploadFile)

module.exports =messagesRouter;