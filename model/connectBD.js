import sql from 'mssql';
import 'dotenv/config';

const config = {
    user: 'sa',
    password:process.env.PASSWORD,
    server:'localhost',
    database:'Teste_api',
    options: {
        encripty: true,
        trustServerCertificate: true
    }
}

async function connectBD(){
    try{
        const pool = await sql.connect(config);
        if(!pool || !pool.connect){
            throw new Error("Erro ao conectar ao banco de dados.");
        }
        return pool
    }catch(erro){
        console.log(erro.message, erro);
        throw erro;
    }
}

async function postDB(nome, email){
        const pool =    await connectBD();
        const resposta = await pool.request()
        .input('nome', nome)
        .input('email', email)
        .query('INSERT INTO cadastro(nome, email) values (@nome, @email)');

        if(!resposta.rowsAffected){
            throw new Error("Conectou, mas nenhuma linha foi inserida no banco de dados.")
        }else{
            console.log("Inserido no banco de dados com sucesso.");
        }

}

async function getDB(){
        const pool = await connectBD();
        const resposta = await pool.query('SELECT * FROM cadastro.');
        return resposta.recordset;
}
export {postDB, getDB};