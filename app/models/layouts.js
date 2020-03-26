module.exports = (sequelize, DataTypes) => {
    const Layout = sequelize.define('Layout', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.TEXT,
            image: DataTypes.TEXT,
            user_id: DataTypes.INTEGER,
            nx_layout_id: DataTypes.TEXT,
            order: DataTypes.INTEGER
        },
        {
            timestamps: true,
            freezeTableName: true,
            tableName: 'layouts'
        }
    );


    return Layout;
}
