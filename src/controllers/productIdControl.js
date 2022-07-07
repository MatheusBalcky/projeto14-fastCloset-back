import db from "../db.js"

export async function productIdControl (req, res){
    const productId = req.params.id;
    try {
        const product = await db.collection('products').findOne({ id: productId});

        if(!product){
            return res.status(404).send('Produto não encontrado');
        }

        return res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}