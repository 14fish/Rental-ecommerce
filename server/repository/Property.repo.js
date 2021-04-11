const db = require("../models");
const Sequelize = db.Sequelize
const Op = Sequelize.Op;
const fs = require('fs')
const osPath = require('path')

async function addProperty(query) {
    try{
        await db.properties.create(query)
        return 'success'
    }
    catch (err){
        console.log(err)
    }
}

async function deleteAll(){
    try{
        await db.properties.destroy({
            truncate: true
        })
        return "All Items Deleted Successfully"
    }
    catch (err){
        console.log(err)
    }
}

async function getPage(pageNumber=1,
                       keyword='',
                       category='',
                       feature='',
                       highPriority,
                       userid = 0){
    try{
        const offset = db.item_number * (pageNumber - 1);
        const limit = db.item_number;
        const where = generateFilter(keyword, category, feature,  highPriority, userid)
        return await db.properties.findAndCountAll({
            order: [['id', 'DESC']],
            where,
            offset,
            limit});
    }
    catch (err){
        console.log(err);
    }
}

function generateFilter(keyword, category, feature,  highPriority, userid){
    let where = {}
    if (keyword !== '')
        where = {
            [Op.or]:generateSearchQuery(keyword)
        }
    where['isArchive'] = false
    if (category !== ''){
        where['category'] = {
            [Op.or]: category.split(',')
        }
    }
    if (feature !== ''){
        const arr = []
        for(const item of feature.split(','))
            arr.push({[Op.like]: `%${item}%`})
        where['feature'] = {
            [Op.or]: arr
        }
    }
    if(userid){
        where['UserId'] = userid;
        delete where.isArchive
    }
    if(highPriority !== undefined){
        where['highPriority'] = (highPriority === 'true');
    }
    return where;
}

function generateSearchQuery(keyword){
    const keywords = keyword.split(' ')
    const columns = "title description category feature location".split(' ')
    const query = []
    for(const keyword of keywords){
        for(const column of columns){
            query.push(
                Sequelize.where(
                    Sequelize.fn('lower', Sequelize.col(column)),
                    {
                        [Op.like]: `%${keyword}%`
                    }
                )
            )
        }
    }
    return query
}


async function getPropertyById(id){
    try{
        return await db.properties.findByPk(id)
    }
    catch (err) {
        console.log(err)
    }
}

async function updateProperty(req){
    try {
        if (!checkUpdateParams(req.query))
            return "Missing Parameters"


        const property = await db.properties.findByPk(req.query.id);
        if (property.UserId !== req.user.userid)
            return "unauthorized"
        req.query.imageURL = await handleImageUrls(req, property);
        return await property.update(req.query)
    }
    catch (e) {
        return e
    }
}

async function handleImageUrls(req, property){
    await deleteOldImages(property.UserId, property.imageURL);
    return getDestPaths(req.files)
}

function deleteOldImages(UserId, imageURL) {

    let path =  osPath.join(__dirname, '..', 'static', `${UserId}`)
    for(const fileName of imageURL.split(';'))
    fs.unlink(osPath.join(path, fileName), err => {
        console.log(err)
    })

}

function getDestPaths(files){
    let imageUrl = ''
    if(files){
        for(const file of files){
            imageUrl += (osPath.basename(file.path) + ';')
        }
    }
    return imageUrl
}

function checkUpdateParams(query){
    let flag = true
    const params = ['title', 'location', 'description', 'isArchive', 'isUnderOffer',
                    'highPriority', 'price', 'category', 'feature', 'id']
    for(const param of params)
        flag &= param in query;
    return flag
}

async function deleteProperty(req){
    const property = await db.properties.findByPk(req.params.id);
    if (property.UserId !== req.user.userid)
        throw "unauthorized"
    deleteOldImages(req.user.userid, property.imageURL)
    await property.destroy()

}

properties = {}

properties.addProperty = addProperty;
properties.deleteAll = deleteAll;
properties.getPage = getPage;
properties.getPropertyById = getPropertyById;
properties.updateProperty = updateProperty
properties.deleteProperty = deleteProperty
module.exports = properties;