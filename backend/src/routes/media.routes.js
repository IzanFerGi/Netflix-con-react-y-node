
const express = require('express');
const router = express.Router();

const { listMedia } = require('../controllers/media.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.get('/', authRequired, listMedia);

module.exports = router;
