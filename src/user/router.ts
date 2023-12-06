import express from 'express';
import * as controller from './controller';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/',authenticate , controller.getAuthenticatedUser);
router.post('/',controller.createUser);
router.post('/login', controller.login);

export default router;