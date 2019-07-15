'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define(
    'Recommendation',
    {
      categoryId: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      lastvisited: DataTypes.DATE,
    },
    {}
  );
  Recommendation.associate = models => {
    Recommendation.belongsTo(models.User, {
      as: 'userRecs',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
    Recommendation.hasMany(models.Rating, {
      as: 'rating',
      foreignKey: {
        fieldName: 'recId',
        allowNull: false,
      },
    });
  };
  return Recommendation;
};
