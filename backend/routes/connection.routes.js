const express = require('express');
const connectionRouter = express.Router();

const sendingReq = require('../controllers/connectionsControllers/sendingReq.controllers');
const acceptingReq = require('../controllers/connectionsControllers/acceptingReq.controllers');
const rejectingReq = require('../controllers/connectionsControllers/rejectReq.controllers');
const pendingReq = require('../controllers/connectionsControllers/pendingReq.controllers');
const allReq = require('../controllers/connectionsControllers/allReq.controllers');
const getRecommendedUsers = require('../controllers/connectionsControllers/recommendUser.controller');

connectionRouter.post('/connection/sending', sendingReq);
connectionRouter.post('/connection/accept/:id', acceptingReq);
connectionRouter.post('/connection/reject/:id', rejectingReq);
connectionRouter.get('/connection/pending/:userId', pendingReq);
connectionRouter.get('/connection/all/:userId', allReq);
connectionRouter.post('/connection/remove/:id', rejectingReq); 
connectionRouter.get("/recommended/:userId", getRecommendedUsers); 

module.exports = connectionRouter;