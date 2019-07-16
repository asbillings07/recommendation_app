'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      title: DataTypes.STRING,
    },
    {}
  );
  Category.associate = models => {
    Category.hasMany(models.Recommendation, {
      foreignKey: {
        fieldName: 'categoryId',
        allowNull: false,
      },
    });
  };
  return Category;
};
