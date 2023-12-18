import express from 'express';
import * as controller from './controller';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.post('/', authenticate, controller.createComment);
router.get('/:postId', authenticate, controller.getPostComments);

export default router;