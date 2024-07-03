'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notes.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    important: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    desc: DataTypes.TEXT,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notes',
  });
  return Notes;
};