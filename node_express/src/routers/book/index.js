const express = require('express');
const bookHandles = require('../../controllers/book');

const bookRouter = express.Router()
console.log('bookHandles:', bookHandles);

bookRouter.delete('/book/:id', bookHandles.deleteBooks);

module.exports = bookRouter;