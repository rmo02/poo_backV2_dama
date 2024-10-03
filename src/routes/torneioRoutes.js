const express = require('express');
const router = express.Router();

const {
atualizar,
criar,
deletar,
listar,
listarUsuarios
} = require('../controller/TorneioController');

//Criar torneio
router.post('/', criar);

//Atualizar torneio
router.put('/:id', atualizar);

//Deletar torneio
router.post('/:id', deletar);

//Listar todos os torneio
router.get('/', listar);

//Listar usuarios do torneio
router.get('/:id', listarUsuarios);

module.exports = router;