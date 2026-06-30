import postRouter from './Routes/postRouter.js';
import getRouter from './Routes/getRouter.js';

import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


// post
app.use("/post", postRouter);
app.use("/obter", getRouter);

// error handling
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let mensagem = "Ocorreu um erro interno no servidor.";

    if(err.number === 2627 || err.number === 2601){
        statusCode = 409; // Status HTTP 409: Conflict
        mensagem = "Este registro já existe."
    }


    if(statusCode === 500){
        console.error("## ERRO INESPERADO ##");
        console.error(err.stack); // Mostra a linha exata que quebrou
    }else{
        console.warn(`[ERRO] Erro tratado (${statusCode}: ${err.message})`);
    }
    res.status(statusCode).json({
        status: 'erro',
        mensagem: mensagem
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})