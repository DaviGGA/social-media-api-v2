import express from 'express';
import * as controller from './controller';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.post('/', authenticate, controller.createProfile);

export default router;