import { Router } from 'express'
import { loginController, registerController } from '../controllers/authControllers.js';
import { loginMiddle, registerMiddle } from '../middlewares/authMiddle.js';
import { productIdControl } from '../controllers/productIdControl.js';
import { finishOrderControl, ordersFinishedControl } from '../controllers/ordersControl.js';
import { addProductMiddle } from '../middlewares/productsMiddle.js';
import { addProductController } from '../controllers/addProductControl.js';
import { getProductsController } from '../controllers/getProductsController.js';
import { insertCartControl } from '../controllers/cartControl.js';


const router = Router();

// & PRODUCTS ROUTES
router.post('/addProduct', addProductMiddle, addProductController);
router.get('/products', getProductsController);
router.get('/product/:id', productIdControl);

// & AUTHENTICATION ROUTES
router.post('/login', loginMiddle,loginController);
router.post('/register', registerMiddle, registerController);

// & CART ROUTES
router.post('/cart', insertCartControl);
router.get('/cart', );


// & FINISH AN ORDER ROUTES
router.post('/finishorder', finishOrderControl);
router.get('/ordersfinished/:order', ordersFinishedControl);


// ! ROTA DE TESTE QND FOR DÁ O DEPLOY
router.get('/helloworld', (req, res) => {
    res.status(200).send('Hello World');
});

export default router;