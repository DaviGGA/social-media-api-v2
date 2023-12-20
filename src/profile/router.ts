import express from 'express';
import * as controller from './controller';
import authenticate from '../middlewares/authenticate';
import multer from 'multer';

const upload = multer({dest:'profile-pictures/'})

const router = express.Router();

router.post('/', upload.single('profilePicture'), authenticate, controller.createProfile);
router.get('/:id', authenticate , controller.getProfileById);

export default router;