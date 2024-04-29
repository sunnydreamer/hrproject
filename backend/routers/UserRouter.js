const router = require("express").Router();
// const UserController = require("../controllers/UserController");

const GetUserInfo = require("../controllers/GetUserInfo")
const PostUserInfo = require("../controllers/PostUserInfo")
const PostUserContact = require("../controllers/PostUserContact")

const GetHousingInfo = require("../controllers/GetHousingInfo")


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
    .get('/info', GetUserInfo)
    .post("/info", PostUserInfo)
    .post("/info/contact", PostUserContact)

    // user visa page
    .get('/visa', (req, res) => { res.send('visa status page render here') })
    .put("/visa/:userid", (req, res) => { res.send('visa status changed successfully') })
    // user housing page
    .get('/housing', GetHousingInfo)
    .post('/housing/report', (req, res) => { res.send('Facility report created') })
    .put('/housing/report/:reportid', (req, res) => { res.send('Replied facility report successfully') })

module.exports = router