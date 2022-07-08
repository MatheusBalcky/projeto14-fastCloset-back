import db from "../db.js";
import { orderFinishedSchema } from "../schemas/authSchemas.js";

export async function finishOrderControl(req, res) {
    const bodyOrder = req.body;

    const { error } = await orderFinishedSchema.validateAsync(bodyOrder);

    if (error) {
        return res.status(422).send('Dados preenchido incorretamente');
    }

    await db.collection('ordersfinished').insertOne(bodyOrder);
    return res.sendStatus(200);
}

export async function ordersFinishedControl(req, res) {
    const { order } = req.params;

    const verifyOrder = await db.collection('ordersfinished').findOne({ order: order });

    if(!verifyOrder){
        return res.sendStatus(404);
    }

    return res.sendStatus(200);
}