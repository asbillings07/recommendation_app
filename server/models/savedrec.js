'use strict';
module.exports = (sequelize, DataTypes) => {
  const SavedRec = sequelize.define(
    'SavedRec',
    {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      recid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Recommendation',
          key: 'id',
        },
      },
    },
    {}
  );

  return SavedRec;
};
