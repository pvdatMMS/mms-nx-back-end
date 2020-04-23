const { getPersons, getPerson, updatePerson } = require('../../../services/personService')

exports.persons = async (req, res) => {
    const user_id = 1

    const persons = await getPersons({ user_id: user_id })
    res.json({
        'error': false,
        'message': 'Get successfully',
        'data': persons
    })
}

exports.update_person = async (req, res) => {
    const user_id = 1
    const id = req.params.id
    await updatePerson(req.body, { id: id })

    const persons = await getPersons({ user_id: user_id })
    res.json({
        'error': false,
        'message': 'Update successfully',
        'data': persons
    })
}