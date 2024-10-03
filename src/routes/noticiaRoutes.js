const express = require('express');
const router = express.Router();

const {
atualizar,
criar,
listar,
deletar
} = require('../controller/noticiaController');

//Criar inscrição
router.post('/', criar);

//Criar inscrição
router.get('/', listar);

//Atualziar atualizar
router.put('/:id', atualizar);

//Deletar inscrição
router.post('/:id', deletar);

module.exports = router;