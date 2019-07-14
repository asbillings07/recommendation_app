'use strict';
module.exports = (sequelize, DataTypes) => {
  const SavedRec = sequelize.define(
    'SavedRec',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  SavedRec.associate = models => {
    SavedRec.hasMany(models.Recommendation, {
      foreignKey: {
        fieldName: 'recId',
        allowNull: false,
      },
    });
    SavedRec.belongsTo(models.User, {
      as: 'userSavedRecs',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
  return SavedRec;
};
