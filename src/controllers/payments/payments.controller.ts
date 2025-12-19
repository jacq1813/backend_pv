// src/controllers/payments/payments.controller.ts
import { Request, Response } from 'express';
import * as paymentService from '../../services/payments/payments.service';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const newPayment = req.body;
    const result = await paymentService.createPayment(newPayment);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

