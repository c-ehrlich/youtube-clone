import express from 'express';
import requireUser from '../../middleware/requireUser';
import {
  findVideosHandler,
  streamVideoHandler,
  updateVideoHandler,
  uploadVideoHandler,
} from './video.controller';

const router = express.Router();

router.get('/', findVideosHandler);
router.get('/:videoId', requireUser, streamVideoHandler);
router.patch('/:videoId', requireUser, updateVideoHandler);
router.post('/', requireUser, uploadVideoHandler);

export default router;
