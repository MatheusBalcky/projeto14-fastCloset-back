import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
import db from '../db.js'
import bcrypt from 'bcrypt';

export async function registerMiddle(req, res, next) {
    const registerBody = req.body;

    try {
        const { error } = registerSchema.validate(registerBody);
        if (error) {
            return res.status(422).send('Dados preenchido incorretamente')
        }

        const emailExists = await db.collection('users').findOne({ email: registerBody.email });
        if (emailExists) {
            return res.status(409).send('E-mail já existente')
        }

        res.locals.registerBody = registerBody;

        next();
    } catch (error) {
        console.log(error)

        res.status(500).send(`${error}`)
    }
}

export async function loginMiddle(req, res, next) {
    const loginBody = req.body;

    try {
        const { error } = loginSchema.validate(loginBody);
        if (error) {
            return res.status(422).send('Preencha os dados corretamente!')
        }

        const user = await db.collection('users').findOne({ email: loginBody.email });

        if (!user) {
            return res.status(404).send('Você ainda não possui uma conta, cadastre-se!')
        }

        if (user && bcrypt.compareSync(loginBody.password, user.password)) {

            res.locals.login = user;
            
            next();

        } else {
            return res.status(401).send('Senha ou email incorretos!');
        }

    } catch (error) {
        console.log(error)

        res.status(500).send(`${error}`)
    }

}