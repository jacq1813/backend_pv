import { Router } from 'express';
import {createVoucher, getVoucherById, getVouchersByClient } from '../controllers/vouchers/vouchers.controller';

const router = Router();

router.post('/', createVoucher);
router.get('/:id', getVoucherById);
router.get('/client/:clientId', getVouchersByClient);

export default router;