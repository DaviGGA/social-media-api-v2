import express from 'express';
import * as controller from './controller';

const router = express.Router();

router.post('/',controller.createUser);
router.post('/login', controller.login);

export default router;