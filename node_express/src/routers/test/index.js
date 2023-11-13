const express = require('express');
const testHandle = require('../../controllers/test')

const testRouter = express.Router()

testRouter.get('/test', testHandle.testApi);

module.exports = testRouter;