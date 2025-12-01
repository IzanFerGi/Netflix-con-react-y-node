const express = require('express');
const router = express.Router();

const {
  listFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/favorites.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.get('/', authRequired, listFavorites);
router.post('/:mediaId', authRequired, addFavorite);
router.delete('/:mediaId', authRequired, removeFavorite);

module.exports = router;
