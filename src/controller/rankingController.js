const { Usuario, Inscricao } = require('../model');

const rankingController = {

  async getRanking(req, res) {
    try {
      // Buscar usuários ordenados por pontuação total e faz a rodenação da pontuação do maio para o menor
      const ranking = await Usuario.findAll({
        attributes: ['id', 'nome', 'apelido', 'pontuacaoTotal'], // Selecionando apenas alguns dados do usuario
        order: [['pontuacaoTotal', 'DESC']],
      });

      // Formatar a resposta
      const formattedRanking = ranking.map(usuario => ({
        id: usuario.id,
        nome: usuario.nome,
        apelido: usuario.apelido,
        pontuacaoTotal: usuario.pontuacaoTotal,
      }));

      return res.status(200).json(formattedRanking);
    } catch (error) {
      console.error('Erro ao obter ranking:', error);
      return res.status(500).json({ message: 'Erro ao obter ranking' });
    }
  }

}

module.exports = rankingController;
