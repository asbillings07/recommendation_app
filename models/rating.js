'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      rate: DataTypes.INTEGER,
      recId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: DataTypes.STRING,
    },
    {}
  );
  Rating.associate = models => {
    Rating.belongsTo(models.User, {
      as: 'userRating',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
    Rating.belongsTo(models.Recommendation, {
      as: 'rating',
      foreignKey: {
        fieldName: 'recId',
        allowNull: false,
      },
    });
  };
  return Rating;
};
