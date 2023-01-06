const express = require("express");
const router = express();
const passport = require("./auth");

router.use(passport.initialize());

// Routes
router.get("/", (req, res, next) => {
    res.status(200).send('<a href="/auth/google">Authenticate with Google</a>');
});

//////

router.get(
    "/auth/google",
    passport.authenticate("google", {
        session: false,
        scope: ["profile", "email"],
    })
);

////

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/?alert=authenticationFailed", session: false }),
    (req, res) => {
        // sending jwt with id=email, and 10 min validity sos that i can use this
        // cookie for signup purpose
        res.cookie("jwt", req.user.token);
        res.redirect("/");
    }
);

////

module.exports = router;
