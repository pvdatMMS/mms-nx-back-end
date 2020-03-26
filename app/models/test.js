module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define('Test', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'test'
        }
    );


    return Test;
}
