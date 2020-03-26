module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: DataTypes.TEXT,
            password: DataTypes.TEXT
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'users'
        }
    );


    return User;
}
