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
      as: 'user',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
    User.hasMany(models.Rating, {
      as: 'user',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
    User.hasMany(models.savedRec, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
  return User;
};
