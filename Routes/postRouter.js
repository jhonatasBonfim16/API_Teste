import express from 'express';
import  {postDB} from '../model/connectBD.js'

const router = express.Router()


router.post('/', async (req, res) => {
        const {nome, email} = req.body;
        await postDB(nome, email);

        res.status(201).json({
            status: "sucesso",
            mensagem: "Dados inseridos com sucesso!"
        })
})

export default router;