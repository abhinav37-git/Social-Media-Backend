const express = require('express');
const { findUsers, followUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', findUsers);
router.post('/follow', authenticateToken, followUser);

module.exports = router;
