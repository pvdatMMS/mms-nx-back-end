
exports.getLayouts = async criteria =>
    db.Layout.findAll(criteria)
    
exports.getLayout = async criteria =>
    db.Layout.findOne({ where: criteria })

exports.createLayout = async data =>
    db.Layout.create(data)

exports.updateLayout = async (data, criteria) =>
    db.Layout.update(data, { where: criteria })

exports.deleteLayout = async (criteria) =>
    db.Layout.destroy({ where: criteria })