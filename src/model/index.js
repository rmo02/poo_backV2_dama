const Sequelize = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.development);

// Importar os modelos
const Usuario = require('./Usuario')(sequelize);
const Torneio = require('./Torneio')(sequelize);
const Inscricao = require('./Inscricao')(sequelize);
const Noticia = require('./Noticia')(sequelize);

// Associações
Usuario.belongsToMany(Torneio, { through: Inscricao, foreignKey: 'usuarioId', as: 'torneios' });
Torneio.belongsToMany(Usuario, { through: Inscricao, foreignKey: 'torneioId', as: 'usuarios' });

Inscricao.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Inscricao.belongsTo(Torneio, { foreignKey: 'torneioId', as: 'torneio' });

// Exportar os modelos e a conexão
module.exports = {
  Usuario,
  Torneio,
  Inscricao,
  Noticia,
  sequelize
};

// Sincronizar os modelos com o banco de dados
sequelize.sync({ alter: true })
  .then(() => console.log('Modelos sincronizados com sucesso!'))
  .catch((err) => console.error('Erro ao sincronizar modelos:', err));
