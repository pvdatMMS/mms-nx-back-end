const { getTest } = require('../../../services/testService')
module.exports = {
    test: (req, res) => {
        getTest().then(results => {
            // console.log(req.user)
            res.json({
                    'error': false,
                    'message': 'Get successfully',
                    'data': results
            })
        }).catch(error => {
            console.log(error)
            res.status(400).json({ 'error': error })
        })
    }
}