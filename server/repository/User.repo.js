require('dotenv').config()
const db = require("../models");
const bcrypt = require('bcrypt');


async function register(query){
    try{
        if(!checkParams(query)){
            return "Required parameter(s) are missing"
        }
        else if(!checkCode(query.code)){
            return "SignUp code is invalid"
        }
        else if(await checkIfUserExists(query.email)){
            return "This email has already been registered"
        }
        return await addUser(query)

    }
    catch (e) {
        console.log(e)
    }
}

async function addUser({password, email, firstname, lastname}) {
    try{
        password = bcrypt.hashSync(password, 10);
        return await db.users.create({
            firstname, lastname, email, password
        })
    }
    catch (err){
        console.log(err)
    }
}

function checkParams(query){
    const {password, email, firstname, lastname, code} = query;
    return password && email && firstname && lastname && code;
}

async function checkIfUserExists(email){
    return await db.users.findOne({where: {email}})
}

function checkCode(code){
    const reg_code = process.env.REGISTER_CODE || 'we_sell_houses_agent'
    return code === reg_code
}


async function login(query){
    try{
        if(!query.email || !query.password){
            return "Required parameter(s) are missing"
        }

        const user = await getUserByEmail(query.email)
        if(user){
            const result = bcrypt.compareSync(query.password, user.dataValues.password)
            if(!result)
                return "Wrong credentials"
            return user
        }
        else
            return "Wrong credentials"

    }
    catch (e) {
        console.log(e)
    }
}

async function getUserByEmail(email){
    return await db.users.findOne({
        where: {email}
    })
}


async function getUserById(id){
    try{
        return await db.users.findByPk(id, {
            attributes: [
                'firstname',
                'lastname',
                'email'
            ]
        })
    }
    catch (e) {
        console.log(e)
    }
}



users = {}

users.register = register
users.login = login
users.getUserById = getUserById
module.exports = users;