const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apelido: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    roles: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
    pontuacaoTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,  // Pontuação inicial será 0
    }
  }, {
    tableName: 'usuarios',
    timestamps: false,
  });
};
