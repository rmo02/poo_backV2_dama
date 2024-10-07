const { Noticia } = require('../model');

const noticiaController = {
  // Listar todas as notícias
  async listar(req, res) {
    try {
      const noticias = await Noticia.findAll();
      res.json(noticias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar notícias' });
    }
  },

  // Criar uma nova notícia
  async criar(req, res) {
    try {
      const { imagem, titulo, conteudo, autor } = req.body;
      const noticia = await Noticia.create({ imagem, titulo, conteudo, autor });
      res.status(201).json(noticia);
    } catch (error) {
      console.log("erro ao criar noticia" ,error)
      res.status(500).json({ error: 'Erro ao criar notícia' });
    }
  },

  // Atualizar uma notícia
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { imagem, titulo, conteudo, autor } = req.body;

      const noticia = await Noticia.findByPk(id);
      if (!noticia) {
        return res.status(404).json({ error: 'Notícia não encontrada' });
      }

      await noticia.update({ imagem, titulo, conteudo, autor });
      res.json(noticia);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar notícia' });
    }
  },

  // Deletar uma notícia
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const noticia = await Noticia.findByPk(id);

      if (!noticia) {
        return res.status(404).json({ error: 'Notícia não encontrada' });
      }

      await noticia.destroy();
      res.json({ message: 'Notícia deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar notícia' });
    }
  }
};

module.exports = noticiaController;
