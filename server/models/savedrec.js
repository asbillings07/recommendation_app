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
    //   SavedRec.hasMany(models.Recommendation, {
    //     foreignKey: {
    //       field: 'recid',
    //     },
    //   });
    //   SavedRec.belongsTo(models.User, {
    //     foreignKey: {
    //       field: 'userid',
    //       allowNull: false,
    //     },
    //   });
  };
  return SavedRec;
};
