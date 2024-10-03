const { Torneio, Usuario } = require('../model');

const torneioController = {
  // Listar todos os torneios
  async listar(req, res) {
    try {
      const torneios = await Torneio.findAll();
      res.json(torneios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar torneios' });
    }
  },

  // Criar um novo torneio
  async criar(req, res) {
    try {
      const { nome, local, data, quantidadeParticipantes, premio } = req.body;
      const torneio = await Torneio.create({ nome, local, data, quantidadeParticipantes, premio });
      res.status(201).json(torneio);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar torneio' });
    }
  },

  // Atualizar um torneio
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, local, data, quantidadeParticipantes, premio } = req.body;
      const torneio = await Torneio.findByPk(id);

      if (!torneio) {
        return res.status(404).json({ error: 'Torneio não encontrado' });
      }

      await torneio.update({ nome, local, data, quantidadeParticipantes, premio });
      res.json(torneio);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar torneio' });
    }
  },

  // Deletar um torneio
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const torneio = await Torneio.findByPk(id);

      if (!torneio) {
        return res.status(404).json({ error: 'Torneio não encontrado' });
      }

      await torneio.destroy();
      res.json({ message: 'Torneio deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar torneio' });
    }
  },

  // Listar usuários inscritos em um torneio
  async listarUsuarios(req, res) {
    try {
      const { id } = req.params;
      const torneio = await Torneio.findByPk(id, {
        include: { model: Usuario, as: 'usuarios' }
      });

      if (!torneio) {
        return res.status(404).json({ error: 'Torneio não encontrado' });
      }

      res.json(torneio.usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar usuários do torneio' });
    }
  }
};

module.exports = torneioController;
