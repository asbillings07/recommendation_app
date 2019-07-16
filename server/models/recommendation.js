'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define(
    'Recommendation',
    {
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      lastvisited: DataTypes.DATE,
    },
    {}
  );
  Recommendation.associate = models => {
    Recommendation.belongsTo(models.User, {
      foreignKey: {
        field: 'userId',
      },
    });
    Recommendation.hasMany(models.Rating, {
      as: 'rating',
      foreignKey: {
        field: 'recId',
        onDelete: 'CASADE',
      },
    });
    Recommendation.belongsTo(models.Category, {
      foreignKey: {
        field: 'categoryId',
      },
    });
  };
  return Recommendation;
};
