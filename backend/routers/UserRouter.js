const router = require("express").Router();
// const UserController = require("../controllers/UserController");

router
    // user signup
    .get('/signup', (req, res) => { res.send("sign up page render here") })
    .post("/signup", (req, res) => { res.send("Sign up successfully") })
    // user login
    .get('/login', (req, res) => { res.send('login page render here') })
    .post("/login", (req, res) => { res.send("Login successfully") })
    // user onboarding
    .get('/onboarding', (req, res) => { res.send('onboarding page render here') })
    .post("/onboarding", (req, res) => { res.send("Welcome onboard") })
    // user info page
    .get('/info', (req, res) => { res.send('user info page render here') })
    .put("/info", (req, res) => { res.send("User info is modified successfully") })
    // user visa page
    .get('/visa', (req, res) => { res.send('visa status page render here') })
    .put("/visa/:userid", (req, res) => { res.send('visa status changed successfully') })
    // user housing page
    .get('/housing', (req, res) => { res.send('housing page render here') })
    .post('/housing/report', (req, res) => { res.send('Facility report created') })
    .put('/housing/report/:reportid', (req, res) => { res.send('Replied facility report successfully') })

module.exports = router