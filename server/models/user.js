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
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE,
      confirmed: DataTypes.BOOLEAN,
      photo: DataTypes.STRING,
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
    User.belongsToMany(models.Recommendation, { through: 'SavedRec' });
    User.hasOne(models.Sessions, {
      as: 'session',
      foreignKey: {
        fieldName: 'userid',
      },
    });
  };
  return User;
};
