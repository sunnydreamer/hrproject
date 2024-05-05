const router = require("express").Router();
const multer = require("multer"); // import multer
const { check } = require("express-validator");

const {GetUserInfo} = require("../controllers/GetUserInfo");

const PostUserInfo = require("../controllers/PostUserInfo");
const PostUserContact = require("../controllers/PostUserContact");
const PutHousingReport = require("../controllers/PutHousingReport.js");
const PutHousingReportComment = require("../controllers/PutHousingReportComment.js");

const GetHRProfile = require("../controllers/GetHRProfile");
const OnboardingController = require("../controllers/OnboardingControllers.js");


const GetHousingInfo = require("../controllers/GetHousingInfo");
const GetAllHousingInfo = require("../controllers/GetAllHousingInfo");

const UserController = require("../controllers/UserController");

const { auth, authBlock } = require("../middlewares/authMiddleware");

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
  .get("/auth", authBlock)
  .get("/documents/:userId", UserController.getDocuments)
  .put(
    "/documents/:userId",
    upload.single("file"),
    UserController.uploadDocuments
  )
  .post(
    "/send-email",
    [
      check("firstName")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("First name is required."),
      check("lastName")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Last name is required."),
      check("email")
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid email address.")
        .not()
        .isEmpty()
        .withMessage("Email is required."),
    ],
    UserController.generateAndStoreTokens
  )
  .post("/info", PostUserInfo)
  .post("/info/contact", PostUserContact)
  .put("/visa/:userid", (req, res) => {
    res.send("visa status changed successfully");
  })
  .post("/housing/report", (req, res) => {
    res.send("Facility report created");
  })
  // .put("/housing/report/:reportid", (req, res) => {
  //   res.send("Replied facility report successfully");
  // })

  // user registration token verification
  .post(
    "/registration-with-token/:regLinkTokenFromUrl",
    [
      check("regToken")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Registration token is required."),
    ],
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
      check("username")
        .not()
        .isEmpty()
        .withMessage("Username is required.")
        .trim()
        .escape(),
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

  .get("/logout", UserController.logout)

  .get("/fetch", authBlock, UserController.fetchUserData)
  .post("/push", authBlock, UserController.pushUserData)

  // user onboarding
  .post("/onboarding", (reqs, res) => {
    res.send("Welcome onboard");
  })
  .get(`/onboarding/getUser`, OnboardingController.fetchUserById)
  .post(`/onboarding/eContact`, OnboardingController.addEmergencyContact)
  .put(`/onboarding/updateUser`, upload.single("file"), OnboardingController.updateUserInfo)
  //fetch contacts has to be post since get with body can cause problems
  .post(`/onboarding/fetchContacts`, OnboardingController.fetchEmergencyContacts)

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
  .get("/housing/all", GetAllHousingInfo)


  //create housing report
  .put("/housing/report", PutHousingReport)
  .put("/housing/report/comment", PutHousingReportComment)

  // get user for HR
  .get("/hr/userprofiles/", GetHRProfile)
  .get("/hr/userprofiles/:id", GetHRProfile)


// .put("/housing/report/:reportid", (req, res) => {
//   res.send("Replied facility report successfully");
// });

module.exports = router;
