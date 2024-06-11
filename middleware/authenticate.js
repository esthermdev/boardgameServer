const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { db } = require('../firebase');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

exports.jwtPassport = passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const userDoc = await db.collection('users').doc(jwt_payload.id).get();
        if(!userDoc.exists) {
            return done(null, false);
        }
        return done(null, userDoc.data())
    } catch (error) {
        return done(error, false);
    }
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});