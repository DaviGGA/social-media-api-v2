import express from 'express';
import * as controller from './controller';
import authenticate from '../middlewares/authenticate';
import multer from 'multer';

const upload = multer({dest:'post-images/'})

const router = express.Router();

router.post('/', upload.single('postImage'), authenticate, controller.createPost);
// router.get('/:id', authenticate, controller.getPostsByUserId);
router.get('/feed', authenticate , controller.userFeed);

export default router;