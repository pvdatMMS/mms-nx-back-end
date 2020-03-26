module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.TEXT
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'status'
        }
    );


    return Status;
}
