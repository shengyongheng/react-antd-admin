const express = require('express');
const indexHandles = require('../../controllers/index');

const indexRouter = express.Router()

indexRouter.get('/', indexHandles.indexApi);

module.exports = indexRouter;