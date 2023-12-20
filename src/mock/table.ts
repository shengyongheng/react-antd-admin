import Mock from 'mockjs'
const Random = Mock.Random
export default Mock.mock('/tableData', 'get', (options: IMockJsOption) => {
    console.log(options, 'options');
    const ret = Mock.mock({
        'items|13-18': [
            {
                'key|+1': 1,
                'name': '@word',
                'age': '@INT(1,100)',
                'tags|1-2': [
                    '@string("upper", 1, 7)', '@string("upper", 1, 7)'
                ],
                'address': `${Random.province()}-${Random.city()}-${Random.county()}`
            },
        ],
    })
    return {
        status: 200,
        message: 'success',
        data: ret
    }
})
