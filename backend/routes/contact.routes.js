const express = require('express');
const contactRouter = express.Router();

const submitContact = require('../controllers/contactControllers/contact.controllers');

contactRouter.post("/contact", submitContact);

module.exports = contactRouter;