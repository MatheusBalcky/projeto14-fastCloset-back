import db from '../db.js'
import { productSchema } from '../schemas/productSchema.js';

export async function addProductMiddle(req, res, next) {
    const product = req.body;

    const { error } = productSchema.validate(product);
    if (error) {
        return res.status(422).send("Produto inválido, revise os campos.")
    }

    try {

        const { authorization } = req.headers;

        const token = authorization?.replace('Bearer ', '');
        const session = await db.collection('sessions').findOne({ token });

        if (!session) {
            return res.status(409).send("Token inválido.");
        }

        if (session.email !== process.env.EMAIL1 && session.email !== process.env.EMAIL2) {
            return res.status(401).send("Você não possui autorização para postar produtos.");
        }

        res.locals.product = product;

        next();

    } catch (error) {
        console.log(error)

        res.status(500).send(`${error}`)
    }

}