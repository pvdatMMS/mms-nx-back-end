const passportJWT = require('passport-jwt')
const { getUser } = require('../app/services/userService')

let ExtractJwt = passportJWT.ExtractJwt
let JwtStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'wowwow'
jwtOptions.passReqToCallback = true

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, async (req, jwt_payload, next) => {
  let user = await getUser({ id: jwt_payload.id })

  if (user) {
    req.user = user
    next(null, user)
  } else {
    next(null, false)
  }
})

module.exports = strategy