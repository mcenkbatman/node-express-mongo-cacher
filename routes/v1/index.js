import { Router } from 'express';
import cache from './cache.js';

const router = Router();

router.use('/cache', cache);

export default router;
