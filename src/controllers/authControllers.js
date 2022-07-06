import db from "../db.js";
import bcrypt from 'bcrypt';

export async function loginController (req, res){
    const loginBody = req.body;

}

export async function registerController (req, res){
    const registerBody = res.locals.registerBody;
    const passwordCrypted = bcrypt.hashSync(registerBody.password, 10);

    try {
        await db.collection('users').insertOne({
            ...registerBody,
            password: passwordCrypted
        })

        res.status(200).send('Conta criada com sucesso');

    } catch (error) {
        res.status(500).send('Erro no server');
    }
}