const passport = require('passport');
const authConfig = require("../configs/auth.config");
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { db } = require("../models/index.model");
const { userService } = require('./user.service');


const signUp = (user) => {
    return userService.addUser(user);
}


passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
},
async (email, password, done) => {
    try {
        const user = await db.user.findOne({email});
        if(!user) return done(null, false, {message : 'User not found'});
        const validate = await user.isValidPass(password);
        if(!validate) return done(null, false, {message : 'Password is incorrect'});
        return done(null, user, {message : 'User logged-in successfully'});
    } catch (err) {
        console.log(err);
        done(err);
    }
}
))


passport.use(new JWTStrategy(
    {
        secretOrKey : authConfig.SECRET_KEY,
        jwtFromRequest : ExtractJWT.fromUrlQueryParameter(authConfig.SECRET_KEY)
    },
    async (token, done) => {
        try {
            return done(null, token)
        } catch (err) {
            console.log(err);
            done(err)
        }
    }
))


module.exports = {
    signUp
}