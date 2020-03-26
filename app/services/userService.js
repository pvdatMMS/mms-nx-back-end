

    exports.getUsers = async () => db.User.findAll(),

    exports.getUser = async criteria => db.User.findOne({where: criteria}),
    
    exports.createUser = async ({username, password}) => db.User.create({ username, password})

