const express = require('express');
const router = express.Router();
const userRouter = require('./UserRouter');
const hrRouter = require("./HrRouter")

router.use('/user', userRouter);
router.use('/hr', hrRouter)

module.exports = router;
