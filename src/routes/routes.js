import { Router } from 'express'
import { loginController, registerController } from '../controllers/authControllers.js';
import { registerMiddle } from '../middlewares/authMiddle.js';

const router = Router();

router.post('/login', loginController);
router.post('/register', registerMiddle, registerController);



// ! ROTA DE TESTE QND FOR DÁ O DEPLOY
router.get('/helloworld', (req, res) => {
    res.status(200).send('Hello World');
});

export default router;