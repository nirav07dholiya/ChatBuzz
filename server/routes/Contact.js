const express = require('express');
const { searchContacts, getContactsForDMList } = require('../controllers/Contact');
const { verifyToken } = require('../middlewares/Auth')
const contactRouter = express.Router();

contactRouter.post('/search',verifyToken,searchContacts)
contactRouter.get('/get-contacts-for-dm',verifyToken,getContactsForDMList)

module.exports = contactRouter;