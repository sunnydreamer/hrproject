const router = require("express").Router();
const HrController = require("../controllers/HrController.js");

router
    .get("/getVisaPendingUsers", HrController.getVisaPendingUsers)

module.exports = router;
