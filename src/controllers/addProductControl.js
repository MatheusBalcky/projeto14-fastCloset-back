import dotenv from 'dotenv';
import db from '../db.js';

dotenv.config()


export async function addProductController(req, res) {
    const product = res.locals.product;
    
    await db.collection('products').insertOne({
        product
    });

    res.status(200).send('Produto adicionado com sucesso.');

}


