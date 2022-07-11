import { ObjectId } from "mongodb";
import db from "../db.js";
import jwt from "jsonwebtoken";

export async function finishOrderControl(req, res) {
    const bodyOrder = req.body;
    const { authorization } = req.headers;

    if (!authorization ) { return res.sendStatus(401) };
    
    const token = await authorization?.replace('Bearer ', '');

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
    
        await db.collection('ordersfinished').insertOne({
            fromUserId: session.userId,
            ...bodyOrder
        });
        
    } catch (error) {
        res.status(400).send(`${error}`)
    }

    return res.sendStatus(200);
}

export async function getOrdersById(req, res) {
    const { userId } = req.params;

    const orders = await db.collection('ordersfinished').findMany({ fromUserId: ObjectId(userId)});

    if(!orders){
        return res.sendStatus(404);
    }

    return res.status(200).send(orders);
}