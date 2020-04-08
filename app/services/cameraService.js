
exports.getCameras = async criteria =>
    db.Camera.findAll({ where: criteria })

exports.getCamera = async criteria =>
    db.Camera.findOne({ where: criteria })

exports.createCamera = async data =>
    db.Camera.create(data)

exports.updateCamera = async (data, criteria) =>
    db.Camera.update(data, { where: criteria })

exports.deleteCamera = async criteria =>
    db.Camera.destroy({ where: criteria })