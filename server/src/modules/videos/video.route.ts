import express from 'express';
import requireUser from '../../middleware/requireUser';
import { updateVideoHandler, uploadVideoHandler } from './video.controller';

const router = express.Router();

router.post('/', requireUser, uploadVideoHandler);
router.patch('/:videoId', requireUser, updateVideoHandler);

export default router;
