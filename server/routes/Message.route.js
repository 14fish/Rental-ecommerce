const router = require('express').Router();
const repo = require('../repository/Message.repo')
const {authenticate} = require('../auth/token')


router.get('/', authenticate ,(async (req, res) =>{
    const result = await repo.getMessages(req)
    res.json(result)
}))

router.post('/add', (async (req, res) =>{
    const result = await repo.addMessage(req.query)
    if(result.dataValues)
        res.json({code: 'success'})
    else
        res.status(400).json({code: result})
}))

router.get('/delete/:id', authenticate, (async (req, res) =>{
    const result = await repo.deleteMessage(req)
    if(result.dataValues)
        res.json({code: 'success'})
    else
        res.status(400).json({code: result})
}))

router.put('/update', authenticate, (async (req, res) => {
    const result = await repo.updateMessage(req)
    if(result.dataValues)
        res.json({code: 'success'})
    else
        res.status(400).json({code: result})
}))

module.exports = router;