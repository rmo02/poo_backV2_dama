const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Torneio', {
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
    local: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quantidadeParticipantes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    premio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    tableName: 'torneios',
    timestamps: false,
  });
};
