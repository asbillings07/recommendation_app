'use strict';
module.exports = (sequelize, DataTypes) => {
  const SavedRec = sequelize.define(
    'SavedRec',
    {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  SavedRec.associate = models => {
    // associations can be defined here
  };
  return SavedRec;
};
