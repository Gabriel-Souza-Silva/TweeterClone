//ONDE O PROGRAMA COMEÇA
//YARN START ---VARIAVEL DEFICIDA NO PACKAGES

//MODULO USADO PARA FAZER AS ROTAS/REQUISIÇOES
const express = require('express');
//MODULO USADO PARA ARMAZENAMENTO NAO RELACIONAL
const mongoose = require('mongoose');
//MODULOPARA PERMITIR O USO DA URL EM APLICAÇÕES EXTERNAS(SEM SER PELO LOCALHOST)
const cors = require('cors');

const app = express();

//DUAS LINHAS USADAS PARA CRIAR O REALTIME, O SOCKET.IO PERMITE UMA CONEXAO ENTRE A REQUISIÇÃO E RESPOSTA DESSE MODO PODENDO PASSAR DADOS QUANDO FAZER UMA REQUISIÇÃO 
const server = require('http').Server(app);
const io = require('socket.io')(server);

//FAZ A CONEXAO COM O DATABASE
mongoose.connect('mongodb://goweek:goweek123@ds121475.mlab.com:21475/goweekgabrielsilva',{
    useNewUrlParser: true
});

//DEFINE O USO DO IO ENTRO DA VARIAVEL REQ DO PROGRAMA
//NEXT TEM QUE PESQUISAR
app.use((req,res,next)=>{
    req.io = io;

    return next();
});

//ABILITRA PERMISSOES
app.use(cors());
//HABILITA USO DE JASON NA APLICAÇÃO 
app.use(express.json());
//CHAMA O ARQUIVO QUE TEM TODAS AS ROTAS 
app.use(require('./routes'));

//UTILIZA A PLAVARA APP OU SERVER, MAS SERVER É PRA USAR O IO,PARA APARECER AS NOTIFICAÇÕES
server.listen(3000,()=>{
    console.log('Server started on port 3000');
});