import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import db from '../db.js';

dotenv.config()

export function loginController(req, res) {
    const user = res.locals.login;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.status(200).json({
        user: {
            name: user.name,
            email: user.email
        },
        token,
    });
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