const express = require('express');

const testRouter = express.Router()

testRouter.get('/test', (req, res) => {
    console.log('id:', req.query.id);
    res.send({
        state: 200,
        message: '请求成功',
        data: {
            name: 'lisi',
            age: 18
        }
    })
});

module.exports = testRouter;