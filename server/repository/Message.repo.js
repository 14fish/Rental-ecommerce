const db = require("../models");


async function getMessages(req){
    const userId = req.user.userid;
    if(!req.query.type)
        return "Missing parameters"
    const where = {userId}
    if(req.query.type === 'archive')
        where.isArchive = true
    return await db.messages.findAll({where})
}

async function addMessage(query){
    const {propertyId, context} = query
    if(!propertyId || !context)
        return "Missing parameters"
    const property = await db.properties.findByPk(propertyId)
    const user = await property.getUser()
    const userId = user.dataValues.id
    return await db.messages.create({
        propertyId,
        userId,
        context
    })
}

async function deleteMessage(req){
    const messageId = req.params.id;
    const message = await db.messages.findByPk(messageId)
    if(!message)
        return "This messageId is not exist"
    const user = await db.users.findByPk(message.dataValues.userId)
    if (req.user.userid !== user.dataValues.id)
        return "unauthorized"
    return await message.destroy()
}

async function updateMessage(req){
    if(!req.query.id || !req.query.isArchive)
        return "Missing parameters"
    const messageId = req.query.id;
    const message = await db.messages.findByPk(messageId)
    if(!message)
        return "This messageId is not exist"
    const user = await db.users.findByPk(message.dataValues.userId)
    if (req.user.userid !== user.dataValues.id)
        return "unauthorized"
    return await message.update({isArchive: req.query.isArchive})

}

messages = {}

messages.addMessage = addMessage;
messages.deleteMessage = deleteMessage;
messages.getMessages = getMessages;
messages.updateMessage = updateMessage;
module.exports = messages;