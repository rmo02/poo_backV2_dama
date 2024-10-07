require('dotenv').config();
const express = require('express');
const cors = require('cors');

const path = require('path');
const { sequelize } = require('./src/model');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const inscricaoRoutes = require('./src/routes/inscricaoRoutes');
const torneioRoutes = require('./src/routes/torneioRoutes');
const noticiaRoutes = require('./src/routes/noticiaRoutes');
const rankingRoutes = require('./src/routes/rankingRoutes');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use('/v1/api/usuario', usuarioRoutes);
app.use('/v1/api/torneio', torneioRoutes);
app.use('/v1/api/inscricao', inscricaoRoutes);
app.use('/v1/api/noticia', noticiaRoutes);
app.use('/v1/api/ranking', rankingRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log("Server rodando na porta 3000"));
});