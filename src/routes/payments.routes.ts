// src/routes/payments.routes.ts
import { Router } from 'express';
import {createPayment} from '../controllers/payments/payments.controller';

const router = Router();

router.post('/', createPayment);

export default router;