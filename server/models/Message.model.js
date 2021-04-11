module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('Message', {
        propertyId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        context: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isArchive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}