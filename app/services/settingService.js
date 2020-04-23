
exports.getSettings = async criteria =>
db.Setting.findAll({ where: criteria })

exports.getSetting = async criteria =>
db.Setting.findOne({ where: criteria })

exports.createSetting = async data =>
db.Setting.create(data)

exports.updateSetting = async (data, criteria) =>
db.Setting.update(data, { where: criteria })
