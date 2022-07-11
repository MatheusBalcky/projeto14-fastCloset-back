import db from "../db.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; dotenv.config()

export async function insertCartControl(req, res) {
    const { productId } = req.body;
    const { authorization } = req.headers;

    if (!authorization || !productId) { return res.sendStatus(401) };

    const token = authorization?.replace('Bearer ', '');

    const err = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        return err
    });

    if (err) {
        return res.status(401).send("Token inválido, tente fazer o login novamente");
    };

    try {
        const session = await db.collection('sessions').findOne({ token });

        if (!session) {
            return res.status(401).send("Sua sessão expirou, tente fazer o login novamente");
        }

        const verifyProductId = await db.collection('products').findOne({ _id: ObjectId(productId) });

        if (!verifyProductId) {
            return res.status(404).send('Produto não encontrado');
        }

        const currentCart = await db.collection('carts').findOne({ userId: ObjectId(session.userId) });

        if (!currentCart) {
            await db.collection('carts').insertOne(
                {
                    userId: session.userId,
                    products: [productId]
                })
        } else {
            await db.collection('carts').updateOne(
                { userId: ObjectId(session.userId) },
                { $push: { products: productId } }
            )

        }

        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Error interno');
    }
}

export async function getCartControl (req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!authorization) { return res.sendStatus(401) };

    const err = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { return err });

    if (err) {
        return res.status(401).send("Token inválido, tente fazer o login novamente");
    };

    const { userId } = await db.collection('sessions').findOne({ token });
    if (!userId) {  return res.status(404).send(`Error, tente fazer o login novamente`) };

    try {


        const { products } = await db.collection('carts').findOne({ userId });
        
        const arrProducts = [];

        for(let i = 0; i < products.length; i++){
            const productEncountered  = await db.collection('products').findOne({ _id: ObjectId(products[i])});
            arrProducts.push(productEncountered);
        }
        
        return res.status(200).send(arrProducts);

    } catch (error) {
        console.log(error)
        res.status(500).send(`${error}`);
    }
}