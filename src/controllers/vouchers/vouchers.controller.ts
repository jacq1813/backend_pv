import { Request, Response } from 'express';
import * as voucherService from '../../services/vouchers/vouchers.service';


export const createVoucher = async (req: Request, res: Response) => {
  try {
    const newVoucher = req.body;
    const voucher = await voucherService.createVoucher(newVoucher);
    res.status(201).json({
      success: true,
      data: voucher
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Para obtener un vale por su ID y verificar su estado 
export const getVoucherById = async (req: Request, res: Response) => {
  try {
    const voucherId = parseInt(req.params.id);
    const voucher = await voucherService.getVoucherById(voucherId);
    res.json({
      success: true,
      data: voucher
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
};

export const getVouchersByClient = async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const vouchers = await voucherService.getVouchersByClient(clientId);
    res.json({
      success: true,
      data: vouchers
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};