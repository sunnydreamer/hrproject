const router = require("express").Router();
const multer = require("multer"); // import multer
const { check } = require("express-validator");

const GetUserInfo = require("../controllers/GetUserInfo");
const PostUserInfo = require("../controllers/PostUserInfo");
const PostUserContact = require("../controllers/PostUserContact");

const GetHousingInfo = require("../controllers/GetHousingInfo");
const UserController = require("../controllers/UserController");

// multer set for file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Specify the filename for uploaded files
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

router
  .get("/documents/:userId", UserController.getDocuments)
  .put(
    "/documents/:userId",
    upload.single("file"),
    UserController.uploadDocuments
  )
  .post("/send-email", UserController.generateAndStoreTokens)
  .post("/info", PostUserInfo)
  .post("/info/contact", PostUserContact)
  .put("/visa/:userid", (req, res) => {
    res.send("visa status changed successfully");
  })
  .post("/housing/report", (req, res) => {
    res.send("Facility report created");
  })
  .put("/housing/report/:reportid", (req, res) => {
    res.send("Replied facility report successfully");
  })

  // user registration token verification
  .post(
    "/registration-with-token/:regLinkToken",
    [check("regToken").trim().escape()],
    UserController.registrationWithToken
  )

  // user signup
  .post(
    "/registration",
    [
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required.")
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email address."),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required.")
        .trim()
        .escape()
        .isLength({ min: 8 })
        .withMessage("Please enter a password with 8 or more characters."),
      check("confirmPassword")
        .not()
        .isEmpty()
        .withMessage("Confirm password is required.")
        .trim()
        .escape()
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match."),
    ],
    UserController.register
  )

  // user login
  .post(
    "/login",
    [
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required.")
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email address."),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required.")
        .trim()
        .escape(),
    ],
    UserController.login
  )

  // user onboarding
  .post("/onboarding", (req, res) => {
    res.send("Welcome onboard");
  })

  // user info page
  .put("/info", (req, res) => {
    res.send("User info is modified successfully");
  })
  .get("/personalinfo", GetUserInfo)

  // user visa page
  .put("/visa/:userid", (req, res) => {
    res.send("visa status changed successfully");
  })

  // user housing page
  .get("/housing", GetHousingInfo)
  .post("/housing/report", (req, res) => {
    res.send("Facility report created");
  })
  .put("/housing/report/:reportid", (req, res) => {
    res.send("Replied facility report successfully");
  });

module.exports = router;
