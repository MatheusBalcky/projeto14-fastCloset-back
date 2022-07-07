import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
import db from '../db.js'


export async function registerMiddle (req, res, next){
    const registerBody = req.body;

    try {
        const { error } = registerSchema.validate(registerBody);
        if(error){
            return res.status(422).send('Dados preenchido incorretamente')
        }

        const emailExists = await db.collection('users').findOne({ email: registerBody.email});
        if(emailExists){
            return res.status(409).send('E-mail já existente')
        }

        res.locals.registerBody = registerBody;
        
        next();
    } catch (error) {
        console.log(error)

        res.status(500).send(`${error}`)
    }
}

export async function loginMiddle (req, res, next){
    const loginBody = req.body;
    try {
        const { error } = loginSchema.validate(registerBody);
        if(error){
            return res.status(422).send('Preencha os dados corretamente!')
        }

        const emailExists = await db.collection('users').findOne({ email: registerBody.email});
        if(!emailExists){
            return res.status(409).send('Você ainda não possui uma conta, crie uma!')
        }
        
        next();
    } catch (error) {
        console.log(error)

        res.status(500).send(`${error}`)
    }

}