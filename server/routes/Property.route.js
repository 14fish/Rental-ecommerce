const router = require('express').Router();
const db = require('../models/index')
const repo = require('../repository/Property.repo')
const osPath = require('path')
const {authenticate} = require('../auth/token')
const multer = require('multer')
const fs = require('fs')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path =  osPath.join(__dirname, '..', 'static', `${req.user.userid}`)
        if(!fs.existsSync(path))
            fs.mkdirSync(path)
        cb(null, path)
    },
    filename: function (req, file, cb) {
        const temp = file.originalname.split('.')
        const file_extension = '.' + temp[temp.length - 1]
        cb(null, file.fieldname + '-' + Date.now() + file_extension)
    }
})
const upload = multer({storage})



router.get('/', async (req, res) =>{
    const {page, keyword, category, feature} = req.query
    if (!page){
        res.json(await repo.getPage())
    }
    else {
        res.json(await repo.getPage(page, keyword, category, feature))
    }
})



router.post('/add', authenticate, upload.array('photos', 10), (async (req, res) => {
    req.query.UserId = req.user.userid
    req.query.imageURL = getDestPaths(req.files)
    const response = await repo.addProperty(req.query)
    if(response == null){
        res.status(400)
        res.json({code: 'Missing parameters'})
    }
    else{
        res.json({code: response})
    }

}))

function getDestPaths(files){
    let imageUrl = ''
    if(files){
        for(const file of files){
            imageUrl += (osPath.basename(file.path) + ';')
        }
    }
    return imageUrl
}

router.put('/update', authenticate, upload.array('photos', 10), (async (req, res) => {
    const response = await repo.updateProperty(req)
    if(response.id){
        res.json({code: 'success'})
    }
    else
        res.status(400).json({code: response})
}))

router.get('/all', (async (req,res) => {
    const properties = await db.properties.findAll();
    res.send(properties)
}))

router.get('/deleteAll', (async (req, res) => {
    res.send(await repo.deleteAll())
    res.json({code: 'success'})
}))

router.post('/delete/:id', authenticate, (async (req, res) => {
    try{
        await repo.deleteProperty(req)
        res.json({code: 'success'})
    }
    catch (e) {
        res.status(400).json({code: e})
    }
}))


router.get('/id/:id', async (req, res) =>{
    const id = req.params.id
    res.json(await repo.getPropertyById(id))
})


module.exports = router;