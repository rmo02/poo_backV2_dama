const { Inscricao, Usuario, Torneio } = require('../model');

const inscricaoController = {

  // Listar todas as inscrições
  async listar(req, res) {
    try {
      const inscricoes = await Inscricao.findAll({
        include: [
          { model: Usuario, as: 'usuario', attributes: ['id', 'nome', 'email'] },
          { model: Torneio, as: 'torneio', attributes: ['id', 'nome'] }
        ]
      });
      res.json(inscricoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar inscrições' });
    }
  },

  // Criar uma nova inscrição (associar usuário a um torneio)
  async criar(req, res) {
    try {
      const { usuarioId, torneioId, pontos } = req.body;
      const inscricao = await Inscricao.create({ usuarioId, torneioId, pontos });
      res.status(201).json(inscricao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar inscrição' });
    }
  },

  // Atualizar a pontuação de um usuário em um torneio
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { pontos } = req.body;

      // Encontrar a inscrição e o usuário relacionado
      const inscricao = await Inscricao.findByPk(id);
      if (!inscricao) {
        return res.status(404).json({ error: 'Inscrição não encontrada' });
      }

      const usuario = await Usuario.findByPk(inscricao.usuarioId);
      
      // Calcular a diferença entre os novos pontos e os antigos
      const diferenca = pontos - inscricao.pontos;

      // Atualizar a inscrição com a nova pontuação
      await inscricao.update({ pontos });

      // Atualizar a pontuação total do usuário
      await usuario.update({ pontuacaoTotal: usuario.pontuacaoTotal + diferenca });

      res.json(inscricao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar inscrição' });
    }
  },

  // Deletar uma inscrição
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const inscricao = await Inscricao.findByPk(id);

      if (!inscricao) {
        return res.status(404).json({ error: 'Inscrição não encontrada' });
      }

      // Atualizar a pontuação total do usuário antes de deletar
      const usuario = await Usuario.findByPk(inscricao.usuarioId);
      await usuario.update({ pontuacaoTotal: usuario.pontuacaoTotal - inscricao.pontos });

      await inscricao.destroy();
      res.json({ message: 'Inscrição deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar inscrição' });
    }
  }
};

module.exports = inscricaoController;
