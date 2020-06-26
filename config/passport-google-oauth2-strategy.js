const passport = require('passport');
const googgleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { findOne } = require('../models/user');

passport.use(new googgleStrategy({
    clientID:"648699672732-gmbsbg64slcfrt0k9n2137s5kni066b9.apps.googleusercontent.com",
    clientSecret :"ti0KT6HIdWabvm3y1PMC-sx6",
    callbackURL: "http://localhost:8000/users/auth/google/callback",

},
function(accessToken ,refreshToken, profile,done ){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log(err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null, user)
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex'),

            },function(err,user){
                if(err){
                    console.log(err);
                    return;
                } 
                return done(null,user);

            })
        }

    })
}
))

module.exports = passport;