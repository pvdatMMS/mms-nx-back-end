module.exports = (sequelize, DataTypes) =>
    sequelize.define('Person',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.TEXT,
            status: DataTypes.INTEGER,
            color: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'person'
        })