// 首页接口
function indexApi(req, res) {
    // res.render('index', { title: 'Express' });
    res.send('首页')
}

module.exports = { indexApi };