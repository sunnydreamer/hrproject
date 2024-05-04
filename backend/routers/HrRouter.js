const router = require("express").Router();
const HrController = require("../controllers/HrController.js");

router
    .get("/getVisaPendingUsers", HrController.getVisaPendingUsers)
    .put("/reviewDocument", HrController.reviewDocument)

module.exports = router;
