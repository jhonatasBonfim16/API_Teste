import express from 'express';
import {getDB} from '../model/connectBD.js';

const router = express.Router();

router.get('/', async (req, res) => {
   const dados = await getDB()
   res.status(200).json({
    status:"sucesso",
    mensagem:"Sucesso ao recuperar dados.",
    dados: dados
   })
})


export default router;