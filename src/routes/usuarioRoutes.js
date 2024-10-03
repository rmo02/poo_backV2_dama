const express = require('express');
const router = express.Router();

const {
atualizar,
criar,
deletar,
listar,
listarTorneios
} = require('../controller/UsuarioController');

//Criar usuarios
router.post('/', criar);

//Atualizar usuario
router.put('/:id', atualizar);

//Deletar usuario
router.post('/:id', deletar);

//Listar todos os usuarios
router.get('/', listar);

//Listar torneios do usuario
router.get('/:id', listarTorneios);

module.exports = router;