module.exports = (sequelize, DataTypes) =>
    sequelize.define('Setting',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: DataTypes.TEXT,
            password: DataTypes.TEXT,
            url: DataTypes.TEXT,
            row_count: DataTypes.INTEGER,
            column_count: DataTypes.INTEGER,
            maker_color: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'settings'
        })