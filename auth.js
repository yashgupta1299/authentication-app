const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

passport.use(
    new GoogleStrategy(
        {
            callbackURL: "http://127.0.0.1:3000/auth/google/callback",
            clientID:
                "########",
            clientSecret: "########",
        },
        (accessToken, refreshToken, profile, done) => {
            // Check if user with same email or id exists in DB
            // console.log(profile._json);
            const token = jwt.sign(
                { id: profile._json.email },
                "process.env.JWTSecretKey",
                { expiresIn: 10 * 60 * 1000 }
            );
            const user = {
                email: profile._json.email,
                username: profile._json.name,
                profileUrl: profile._json.picture,
                token,
            };
            // console.log(user);
            // i can pass error here
            // done(new Error("something went wrong..."), user);

            // i passed user here so that i can use this in callback url as req.user
            done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    if (user) return done(null, user);
    else return done(null, false);
});

passport.deserializeUser((id, done) => {
    if (user) return done(null, user);
    else return done(null, false);
});

module.exports = passport;

// console.log(profile) in line 16
// {
//     id: '4253645764',
//     displayName: 'Yash Gupta',
//     name: { familyName: 'Gupta', givenName: 'Yash' },
//     emails: [ { value: 'email@gmail.com', verified: true } ],
//     photos: [
//       {
//         value: 'https://lh3.googleusercontent.com/a/AEdFTp6mgF4Un0e6QDeNp084P4HuSsDc8r7MnflblZI=s96-c'
//       }
//     ],
//     provider: 'google',
//     _raw: '{\n' +
//       '  "sub": "4253645764",\n' +
//       '  "name": "Yash Gupta",\n' +
//       '  "given_name": "Yash",\n' +
//       '  "family_name": "Gupta",\n' +
//       '  "picture": "https://lh3.googleusercontent.com/a/AEdFTp6mgF4Un0e6QDeNp084P4HuSsDc8r7MnflblZI\\u003ds96-c",\n' +
//       '  "email": "email@gmail.com",\n' +
//       '  "email_verified": true,\n' +
//       '  "locale": "en-GB"\n' +
//       '}',
//     _json: {
//       sub: '4253645764',
//       name: 'Yash Gupta',
//       given_name: 'Yash',
//       family_name: 'Gupta',
//       picture: 'https://lh3.googleusercontent.com/a/AEdFTp6mgF4Un0e6QDeNp084P4HuSsDc8r7MnflblZI=s96-c',
//       email: 'email@gmail.com',
//       email_verified: true,
//       locale: 'en-GB'
//     }
//   }

// read: "https://javascript.plainenglish.io/4-steps-to-create-google-authentication-api-in-node-js-e4bab8f744bc"