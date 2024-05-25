const User = require('../models/User');
const Follow = require('../models/Follow');

exports.findUsers = async (req, res) => {
  const { search } = req.query;
  try {
    const users = await User.findAll({
      where: {
        username: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.followUser = async (req, res) => {
  const { followerId, followingId } = req.body;
  try {
    const follow = await Follow.create({ followerId, followingId });
    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
