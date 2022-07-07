import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import db from "../db.js";
import bcrypt from 'bcrypt';

dotenv.config()

export async function loginController(req, res) {
    const user = req.body;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    try {

        return res.status(200).json({
            user: {
                name: user.id,
                email: user.email
            },
            token,
        });

    } catch (error) {
        res.sendstatus(500);
    }

}

export async function registerController(req, res) {
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