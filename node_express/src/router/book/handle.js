// 删除书本
function deleteBooks(req, res) {
    console.log('删除id:', req.params.id);
    res.send({
        state: 200,
        message: '删除成功',
    })
}

module.exports = { deleteBooks };