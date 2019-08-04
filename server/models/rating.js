'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      rate: DataTypes.INTEGER,
      recid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Rating.associate = models => {
    Rating.belongsTo(models.User, {
      as: 'userRating',
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      },
    });
    Rating.belongsTo(models.Recommendation, {
      as: 'rating',
      foreignKey: {
        fieldName: 'recid',
        allowNull: false,
      },
    });
  };
  return Rating;
};
