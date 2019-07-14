'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      title: DataTypes.STRING,
    },
    {}
  );
  Category.associate = models => {};
  return Category;
};
