// src/services/vouchers.service.ts
import type { VoucherType, NewVoucherType } from '../../types/voucherType';
import { prisma } from '../../config/database';

// Crear vale
export const createVoucher = async (newVoucher: NewVoucherType) => {
  try {
    const { total, clientId } = newVoucher;

    // Calcular fecha de pago (agregando 15 dias a partir de la creacion)
    const createDate = new Date();
    const paymentDate = new Date(createDate);
    paymentDate.setDate(paymentDate.getDate() + 15);

    const voucher = await prisma.voucher.create({
      data: {
        total,
        pending: total,
        createDate,
        paymentDate,
        status: false, // false = ACTIVO, true = PAGADO
        clientId
      }
    });
    
    return {
      voucherId: voucher.id,
      total: voucher.total.toNumber(),
      pending: voucher.pending.toNumber(),
      createDate: voucher.createDate,
      paymentDate: voucher.paymentDate,
      status: voucher.status,
      clientId: voucher.clientId
    };
  } catch (error: any) {
    throw new Error('Error al crear vale: ' + error.message);
  }
};


// Obtener vale por ID
export const getVoucherById = async (voucherId: number) => {
  try {
    const voucher = await prisma.voucher.findUnique({
      where: { id: voucherId }
    });
    
    if (!voucher) throw new Error('Vale no encontrado');
    
    return {
      voucherId: voucher.id,
      total: voucher.total.toNumber(),
      pending: voucher.pending.toNumber(),
      createDate: voucher.createDate,
      paymentDate: voucher.paymentDate,
      status: voucher.status,
      clientId: voucher.clientId
    };
  } catch (error: any) {
    throw new Error('Error al obtener el vale: ' + error.message);
  }
};



// Obtener vales por cliente
export const getVouchersByClient = async (clientId: number) => {
  try {
    const vouchers = await prisma.voucher.findMany({
      where: { clientId }
    });
    
    return vouchers.map(voucher => ({
      voucherId: voucher.id,
      total: voucher.total.toNumber(),
      pending: voucher.pending.toNumber(),
      createDate: voucher.createDate,
      paymentDate: voucher.paymentDate,
      status: voucher.status,
      clientId: voucher.clientId
    }));
  } catch (error: any) {
    throw new Error('Error al obtener vales del cliente: ' + error.message);
  }
};
