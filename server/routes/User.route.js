const router = require('express').Router();
const repoUser = require('../repository/User.repo');
const repoProperty = require('../repository/Property.repo');
const {signToken, authenticate} = require('../auth/token')

router.post('/register', async function (req, res) {
    const result = await repoUser.register(req.query)
    if(result.dataValues){
        res.json({code: 'success'})
    }
    else {
        res.status(400).json({code: result})
    }
})


router.post('/login', async (req, res) => {
    const result = await repoUser.login(req.query)
    if(result.dataValues){
        const token = signToken(result.dataValues.id)
        res.header('auth-token', token).json({code: 'success', token})
    }
    else {
        res.status(400).json({code: result})
    }
})

router.get('/profile', authenticate, async (req, res) => {
        res.json(await repoUser.getUserById(req.user.userid))
})


router.get('/logout', authenticate, (req, res) => {
    req.user = null;
    res.json({code: 'success'});
})

router.get('/properties', authenticate, async (req, res) =>{
    const {page, keyword, category, feature, highPriority} = req.query
    res.json(await repoProperty.getPage(page, keyword, category, feature, highPriority,  req.user.userid))
})

module.exports = router;