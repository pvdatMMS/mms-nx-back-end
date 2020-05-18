module.exports = (sequelize, DataTypes) =>
    sequelize.define('TrackPath',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            from: DataTypes.INTEGER,
            to: DataTypes.INTEGER,
            color: DataTypes.INTEGER
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'track_paths'
        })
