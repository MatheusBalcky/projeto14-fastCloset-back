import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
import dotenv from 'dotenv';
import db from '../db.js'

dotenv.config()

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
            return res.status(409).send('Você ainda não possui uma conta, cadastre-se!')
        }

        if (user && bcrypt.compareSync(usuario.password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

            return res.status(201).json({
                user: {
                    name: user.id,
                    email: user.email
                },
                token,
            });

        } else {
            return res.status(401).send('Senha ou email incorretos!');
        }

    } catch (error) {
        console.log(error)

        res.status(500).send(`${error}`)
    }

}