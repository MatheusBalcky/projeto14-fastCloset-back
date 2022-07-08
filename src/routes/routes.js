import { Router } from 'express'
import { loginController, registerController } from '../controllers/authControllers.js';
import { loginMiddle, registerMiddle } from '../middlewares/authMiddle.js';
import { productIdControl } from '../controllers/productIdControl.js';
import { finishOrderControl, ordersFinishedControl } from '../controllers/ordersControl.js';

const router = Router();

router.post('/login', loginMiddle,loginController);
router.post('/register', registerMiddle, registerController);
router.get('/product/:id', productIdControl);



router.post('/finishorder', finishOrderControl);
router.get('/ordersfinished/:order', ordersFinishedControl);


// ! ROTA DE TESTE QND FOR DÁ O DEPLOY
router.get('/helloworld', (req, res) => {
    res.status(200).send('Hello World');
});

export default router;