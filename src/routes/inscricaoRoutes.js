const express = require('express');
const router = express.Router();

const {
   listar,
   atualizar,
   criar,
   deletar 
} = require('../controller/InscricaoController');

//Criar inscrição
router.post('/', criar);

//Criar inscrição
router.get('/', listar);

//Atualziar atualizar
router.put('/:id', atualizar);

//Deletar inscrição
router.delete('/:id', deletar);

module.exports = router;