module.exports = (sequelize, DataTypes) =>
    sequelize.define('HistoryTrackPath',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            paths: DataTypes.TEXT,
            color: DataTypes.INTEGER,
            person_id: DataTypes.INTEGER
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'history_track_paths'
        })
