const express = require('express');
const router = express.Router();
const userRouter = require('./UserRouter');

router.use('/user', userRouter);

module.exports = router;
