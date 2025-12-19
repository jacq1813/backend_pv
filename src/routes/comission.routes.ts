// src/routes/comission.routes.ts
import { Router } from 'express';
import { calculateCommission} from '../controllers/comission/comission.controller';

const router = Router();

router.get('/voucher/:voucherId', calculateCommission);

export default router;