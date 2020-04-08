
const jwt = require('jsonwebtoken')
const { getUser, createUser } = require('../../../services/userService')

exports.register = async (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        const user = await getUser({ username })
        if (!user)
            createUser({ username, password }).then(user => res.json({ user, message: 'account created successfully!' }))
                .catch(error => {
                    res.status(500).json(error)
                })
        else
            res.status(409).json({ message: 'Username is existing!' })
    } else
        res.status(400).json({ message: 'username and password is required!' })

}

exports.token = async (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        const user = await getUser({ username })
        if (!user)
            res.status(401).json({ message: 'No such user found!' })
        if (user.password === password) {
            let payload = { id: user.id }
            let token = jwt.sign(payload, 'wowwow')

            res.json({ access_token: token })
        } else
            res.status(401).json({ message: 'Password is incorrect!' })
    } else
        res.status(400).json({ message: 'Username and password is required!' })
}