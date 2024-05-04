const router = require("express").Router();
const HrController = require("../controllers/HrController.js");

router
    .get("/getVisaPendingUsers", HrController.getVisaPendingUsers)
    .put("/reviewDocument", HrController.reviewDocument)
    .get("/getAllVisaUsers", HrController.getAllVisaUsers)

module.exports = router;
