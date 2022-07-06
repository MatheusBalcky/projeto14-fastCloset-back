import { Router } from 'express'
import { loginController } from '../controllers/loginController.js';

const router = Router();

router.post('/login', loginController);



// ! ROTA DE TESTE QND FOR DÁ O DEPLOY
router.get('/helloworld', (req, res) => {
    res.status(200).send('Hello World');
});

export default router;