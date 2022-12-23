const express = require('express');
const router = express.Router();

const helplineController = require('../../src/controllers/helpline.controller');

// fetching helpline details
router.get('/', helplineController.helpline);

module.exports = router;