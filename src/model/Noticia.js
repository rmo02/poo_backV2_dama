const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Noticia', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imagem: {
      type: DataTypes.STRING,
    },
    titulo:{
      type: DataTypes.STRING,
      allowNull:false
    },
    conteudo:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    autor:{
      type: DataTypes.STRING,
      allowNull:false
    },
  }, {
    tableName: 'noticias',
    timestamps: false,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
};
