const { Usuario, Torneio } = require('../model');
const SECRET_KEY = 'ProjetoPo0@#';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioController = {
  // Listar todos os usuários
  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  // Criar um novo usuário
  async criar(req, res) {
    try {
      const { nome, apelido, email, senha, avatar, roles } = req.body;

      // Hash da senha antes de salvar
      const senhaHash = await bcrypt.hash(senha, 10);

      const usuario = await Usuario.create({ nome, apelido, email, senha: senhaHash, avatar, roles });
      res.status(201).json(usuario);
    } catch (error) {
      console.log('usuario', error)
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  // Atualizar um usuário
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, apelido, email, avatar, roles } = req.body;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await usuario.update({ nome, apelido, email, avatar, roles });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  // Deletar um usuário
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await usuario.destroy();
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },

  // Listar torneios de um usuário
  async listarTorneios(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id, {
        include: { model: Torneio, as: 'torneios' }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json(usuario.torneios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar torneios do usuário' });
    }
  },

  // Função de login
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Buscar usuário pelo email
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Verificar a senha
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, email: usuario.email, roles: usuario.roles },
        SECRET_KEY,
        { expiresIn: '1h' }  // Token expira em 1 hora
      );

      // Retornar as informações do usuário e o token
      res.json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          roles: usuario.roles
        },
        token
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  },

};

module.exports = usuarioController;
