const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')
const config = require('../config')

// ตั้งต่า JWT Strategy
const jwtOption = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwtSecret
}

// สร้าง JWTStrategy 

const jwtLogin = new JwtStrategy (jwtOption, (payload, done) => {
    console.log(payload)
    User.findById(payload.id, (err, user) => {
        if (err) {return done(err,false) }

        if (user) {
            done (null, user)
        }
        else {
            done (null, false)
        }

    })
})

// สร้าง local strategy
// สั่งให้ local strategy ใช้ email แทน username
const localOptions = { usernameField: "email" }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

    User.findOne({email: email}, (err, user) => {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }
        
        //compare new password and store password ด้วย methode ของ user 
        console.log("Before compare")
        const isMatch = user.comparePassword(password)

        if (isMatch) {
            done(null, user)
        } else {
            done(null, false)
        }
    })

})


//  ทำให้ passport รู้จัก jwt
passport.use(jwtLogin)

passport.use(localLogin)
