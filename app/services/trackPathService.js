
exports.getTrackPaths = async criteria =>
    db.TrackPath.findAll(criteria)

exports.getTrackPath = async criteria =>
    db.TrackPath.findOne({ where: criteria })

exports.createTrackPath = async data =>
    db.TrackPath.create(data)

exports.updateTrackPath = async (data, criteria) =>
    db.TrackPath.update(data, { where: criteria })

exports.deleteTrackPath = async (criteria) =>
    db.TrackPath.destroy({ where: criteria })