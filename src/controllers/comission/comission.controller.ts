// src/controllers/commission.controller.ts
import { Request, Response } from 'express';
import * as commissionService from '../../services/comission/comission.service';

export const calculateCommission = async (req: Request, res: Response) => {
  try {
    const voucherId = parseInt(req.params.voucherId);
    const commission = await commissionService.calculateCommission(voucherId);
    res.json({
      success: true,
      data: commission
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};