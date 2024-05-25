const Post = require('../models/Post');
const ScheduledPost = require('../models/ScheduledPost');
const Follow = require('../models/Follow');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

exports.getFeed = async (req, res) => {
  const userId = req.user.userId;
  try {
    const follows = await Follow.findAll({ where: { followerId: userId } });
    const followIds = follows.map(follow => follow.followingId);
    const posts = await Post.findAll({
      where: {
        userId: followIds,
      },
      include: [
        { model: Like },
        { model: Comment },
      ],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { content, mediaUrl, scheduledTime } = req.body;
  const userId = req.user.userId;
  try {
    if (scheduledTime) {
      const scheduledPost = await ScheduledPost.create({
        content,
        mediaUrl,
        scheduledTime,
        userId,
      });
      res.status(201).json(scheduledPost);
    } else {
      const post = await Post.create({ content, mediaUrl, userId });
      res.status(201).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other post controller methods...

exports.likePost = async (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.postId;
    try {
      const like = await Like.create({ userId, postId });
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.unlikePost = async (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.postId;
    try {
      await Like.destroy({ where: { userId, postId } });
      res.status(200).json({ message: 'Like removed' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.commentOnPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.userId;
    const postId = req.params.postId;
    try {
      const comment = await Comment.create({ content, userId, postId });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.editComment = async (req, res) => {
    const { content } = req.body;
    const commentId = req.params.commentId;
    try {
      await Comment.update({ content }, { where: { id: commentId } });
      res.status(200).json({ message: 'Comment updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    try {
      await Comment.destroy({ where: { id: commentId } });
      res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };