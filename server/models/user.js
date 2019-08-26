'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
      },
      photo: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
      },
    },
    {}
  );
  User.associate = models => {
    User.hasMany(models.Recommendation, {
      foreignKey: {
        fieldName: 'userid',
      },
    });
    User.hasMany(models.Rating, {
      as: 'userRating',
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      },
    });
    User.hasMany(models.SavedRec, {
      as: 'userSavedRecs',
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      },
    });

    User.hasMany(models.Comment, {
      as: 'userComments',
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      },
    });
  };
  return User;
};
