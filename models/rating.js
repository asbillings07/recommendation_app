'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      rate: DataTypes.INTEGER,
      recid: DataTypes.INTEGER,
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: DataTypes.STRING,
    },
    {}
  );
  Rating.associate = models => {
    // associations can be defined here
  };
  return Rating;
};
