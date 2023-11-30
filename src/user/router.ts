import express from 'express';
import * as controller from './controller';

const router = express.Router();

router.post('/',controller.createUser);

export default router;