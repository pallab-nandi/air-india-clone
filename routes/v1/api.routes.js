const express = require('express');
const router = express.Router();

const helplineRoute = require('./helpline.routes');
const authRoute = require('./auth.routes');

router.use('/helpline', helplineRoute);
router.use('/auth', authRoute);

module.exports = router;