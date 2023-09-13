import { Router } from 'express';
import tokensController from '../controllers/tokens.js';

const router = Router();

router.post('/', tokensController.createToken);

export default router;