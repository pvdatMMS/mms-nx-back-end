

exports.getUsers = async () =>
    db.User.findAll()

exports.getUser = async criteria =>
    db.User.findOne({ where: criteria })

exports.createUser = async data =>
    db.User.create(data)

