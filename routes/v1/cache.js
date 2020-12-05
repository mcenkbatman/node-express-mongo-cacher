import { Router } from 'express';
import { CacheController } from '../../controllers/index.js';

const router = Router();

router.get('/:key', CacheController.getDataByKey);
router.get('/', CacheController.getAllData);
// router.post('/upsert/:key', CacheController.upsertDataByKey);
// router.delete('/:key', CacheController.removeDataByKey);
// router.delete('/', CacheController.removeAllData);

export default router;
