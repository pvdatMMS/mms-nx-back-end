
exports.getPersons = async criteria =>
db.Person.findAll({ where: criteria })

exports.getPerson = async criteria =>
db.Person.findOne({ where: criteria })

exports.createPerson = async data =>
db.Person.create(data)

exports.updatePerson = async (data, criteria) =>
db.Person.update(data, { where: criteria })

exports.deletePerson = async criteria =>
db.Person.destroy({ where: criteria })