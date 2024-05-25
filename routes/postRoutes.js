const express = require('express');
const {
  getFeed,
  createPost,
  likePost,
  unlikePost,
  commentOnPost,
  editComment,
  deleteComment,
} = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/feed', authenticateToken, getFeed);
router.post('/', authenticateToken, createPost);
router.post('/:postId/like', authenticateToken, likePost);
router.delete('/:postId/like', authenticateToken, unlikePost);
router.post('/:postId/comments', authenticateToken, commentOnPost);
router.put('/comments/:commentId', authenticateToken, editComment);
router.delete('/comments/:commentId', authenticateToken, deleteComment);

module.exports = router;
