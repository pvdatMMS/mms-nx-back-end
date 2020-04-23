module.exports = (sequelize, DataTypes) =>
    sequelize.define('Camera',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.TEXT,
            url: DataTypes.TEXT,
            camera_id: DataTypes.TEXT,
            layout_id: DataTypes.INTEGER,
            color: DataTypes.INTEGER,
            axisX: DataTypes.DOUBLE,
            axisY: DataTypes.DOUBLE,
            status_id: DataTypes.INTEGER
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'camera'
        })
