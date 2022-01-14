const sequelize = require("../config/connection");
const { DataTypes, Model } = require("sequelize");

class Pet extends Model {}
Pet.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },  
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
         model: "user",
         key: "id",
      },
      defaultValue: null,
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    // this will be super cute if i can get it to work //
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "pet",
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Pet;