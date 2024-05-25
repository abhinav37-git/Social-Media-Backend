const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const ScheduledPost = sequelize.define('ScheduledPost', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scheduledTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  posted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

ScheduledPost.belongsTo(User, { foreignKey: 'userId' });

module.exports = ScheduledPost;
