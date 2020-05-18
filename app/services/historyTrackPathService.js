
exports.getHistoryTrackPaths = async criteria =>
    db.HistoryTrackPath.findAll(criteria)

exports.getHistoryTrackPath = async criteria =>
    db.HistoryTrackPath.findOne({ where: criteria })

exports.createHistoryTrackPath = async data =>
    db.HistoryTrackPath.create(data)

exports.updateHistoryTrackPath = async (data, criteria) =>
    db.HistoryTrackPath.update(data, { where: criteria })

exports.deleteHistoryTrackPath = async (criteria) =>
    db.HistoryTrackPath.destroy({ where: criteria })