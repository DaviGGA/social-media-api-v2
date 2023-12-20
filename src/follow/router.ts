import express from 'express';
import * as controller from './controller';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.post('/', authenticate, controller.follow);
router.post('/check-follow', authenticate, controller.checkFollow);
router.get('/followers-count/:id', controller.getUserFollowersCount);

export default router;