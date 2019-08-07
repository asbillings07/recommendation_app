'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      comment: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Comment Required',
          },
        },
      },
      userid: DataTypes.INTEGER,
      recid: DataTypes.INTEGER,
    },
    {}
  );
  Comment.associate = models => {
    Comment.belongsTo(models.User, {
      as: 'userComments',
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
