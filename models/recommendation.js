'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define(
    'Recommendation',
    {
      categoryId: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      lastvisited: DataTypes.STRING,
    },
    {}
  );
  Recommendation.associate = models => {
    // associations can be defined here
  };
  return Recommendation;
};
