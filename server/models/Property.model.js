module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Property', {
            title: {
              type: DataTypes.STRING,
              allowNull: false
            },
            location:{
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT
            },
            isArchive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isUnderOffer: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            imageURL: {
                type: DataTypes.STRING
            },
            highPriority: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            category:{
                type: DataTypes.STRING
            },
            feature:{
                type: DataTypes.STRING
            }
        }
    )
}