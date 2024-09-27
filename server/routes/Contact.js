const express = require("express");
const {
  searchContacts,
  getContactsForDMList,
  getAllContacts,
} = require("../controllers/Contact");
const { verifyToken } = require("../middlewares/Auth");
const contactRouter = express.Router();

contactRouter.post("/search", verifyToken, searchContacts);
contactRouter.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);
contactRouter.get("/get-all-contacts", verifyToken, getAllContacts);

module.exports = contactRouter;
