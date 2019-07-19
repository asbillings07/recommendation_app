'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
  };
  return User;
};
