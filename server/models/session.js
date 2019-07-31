'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define(
    'Sessions',
    {
      sid: DataTypes.STRING,
      expires: DataTypes.DATE,
      data: DataTypes.TEXT,
      userid: DataTypes.INTEGER,
    },
    {}
  );

  Sessions.associate = models => {
    Sessions.belongsTo(models.User, {
      as: 'session',
      foreignKey: {
        fieldName: 'userid',
      },
    });
  };

  return Sessions;
};
