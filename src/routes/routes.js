import { Router } from 'express'
import { loginController, registerController } from '../controllers/authControllers.js';
import { loginMiddle, registerMiddle } from '../middlewares/authMiddle.js';
import { productIdControl } from '../controllers/productIdControl.js';
import { finishOrderControl } from '../controllers/finishOrderControl.js';
import { addProductMiddle } from '../middlewares/productsMiddle.js';
import { addProductController } from '../controllers/addProductControl.js';
import { getProductsController } from '../controllers/getProductsController.js';

const router = Router();

router.post('/addProduct', addProductMiddle, addProductController)
router.get('/products', getProductsController)
router.post('/login', loginMiddle,loginController);
router.post('/register', registerMiddle, registerController);
router.get('/product/:id', productIdControl);



router.post('/finishorder', finishOrderControl)

// ! ROTA DE TESTE QND FOR DÁ O DEPLOY
router.get('/helloworld', (req, res) => {
    res.status(200).send('Hello World');
});

export default router;