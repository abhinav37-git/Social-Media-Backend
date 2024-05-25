const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.associate = (models) => {
  User.belongsToMany(models.User, {
    through: 'Follows',
    as: 'Followers',
    foreignKey: 'followingId'
  });

  User.belongsToMany(models.User, {
    through: 'Follows',
    as: 'Following',
    foreignKey: 'followerId'
  });
};


module.exports = User;
