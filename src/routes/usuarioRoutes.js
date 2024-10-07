const express = require('express');
const router = express.Router();

const {
login,
atualizar,
criar,
deletar,
listar,
listarTorneios
} = require('../controller/UsuarioController');

//Criar usuarios
router.post('/', criar);

//fazer login
router.post('/login', login);

//Atualizar usuario
router.put('/:id', atualizar);

//Deletar usuario
router.delete('/:id', deletar);

//Listar todos os usuarios
router.get('/', listar);

//Listar torneios do usuario
router.get('/:id', listarTorneios);

module.exports = router;