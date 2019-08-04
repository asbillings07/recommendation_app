'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      comment: DataTypes.STRING,
      userid: DataTypes.INTEGER,
      recid: DataTypes.INTEGER,
    },
    {}
  );
  Comment.associate = models => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      },
    });

    Comment.belongsTo(models.Recommendation, {
      foreignKey: {
        fieldName: 'recid',
        allowNull: false,
      },
    });
  };
  return Comment;
};
