const {Router}=require('express');
const { verifyToken } = require('../middlewares/Auth');
const { createChannel, getUserChannels } = require('../controllers/Channel');


const channelRoutes = Router();

channelRoutes.post('/create-channel',verifyToken,createChannel)
channelRoutes.get('/get-user-channels',verifyToken,getUserChannels)

module.exports = channelRoutes