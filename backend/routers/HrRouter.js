const router = require("express").Router();
const HrController = require("../controllers/HrController.js");
const OnboardingController = require(`../controllers/OnboardingControllers.js`);

router
  .get("/getVisaPendingUsers", HrController.getVisaPendingUsers)
  .put("/reviewDocument", HrController.reviewDocument)
  .get("/getAllVisaUsers", HrController.getAllVisaUsers)

  //onboarding
  .get(`/onboarding/getAllUsers`, OnboardingController.fetchAllUsers)
  .put(`/onboarding/updateUser`, OnboardingController.updateUserStatus);
module.exports = router;
