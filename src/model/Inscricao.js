const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Inscricao', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    pontos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    tableName: 'inscricoes',
    timestamps: false, 
  });
};
