const {Router}=require('express');
const { verifyToken } = require('../middlewares/Auth');
const { createChannel, getUserChannels, getChannelMessages } = require('../controllers/Channel');


const channelRoutes = Router();

channelRoutes.post('/create-channel',verifyToken,createChannel)
channelRoutes.get('/get-user-channels',verifyToken,getUserChannels)
channelRoutes.get('/get-channel-messages/:channelId',verifyToken,getChannelMessages)

module.exports = channelRoutes