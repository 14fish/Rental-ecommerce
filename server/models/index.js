require('dotenv').config()
const env = process.env
const { Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize({
    dialect: env.DB,
    storage: env.DB_PATH,
    logging: false
});

const db = {};
db.item_number = env.ITEMS_ON_PAGE
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.properties = require('./Property.model')(sequelize, DataTypes);
db.users = require('./User.model')(sequelize, DataTypes);
db.messages = require('./Message.model')(sequelize, DataTypes)

db.users.hasMany(db.properties);
db.properties.belongsTo(db.users);

(async () => await sequelize.sync())()
module.exports = db;