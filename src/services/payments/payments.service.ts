// src/services/payments/payments.service.ts
import type { NewPaymentType } from '../../types/paymentsType';
import { prisma } from '../../config/database';

// Registrar pago de un vale, ya sea parcial o total
export const createPayment = async (newPayment: NewPaymentType) => {
  try {
    const { amount, voucherId } = newPayment;

    // Validar que el vale exista
    const voucher = await prisma.voucher.findUnique({
      where: { id: voucherId }
    });
    
    if (!voucher) throw new Error('Vale no encontrado');
    
    // Validar que el vale no esté pagado
    if (voucher.status) throw new Error('El vale ya está completamente pagado');
    
    // Validar monto positivo
    if (amount <= 0) throw new Error('El monto del pago debe ser positivo');
    
    // Calcular nuevo saldo pendiente
    const currentPending = voucher.pending.toNumber();
    let newPending = currentPending - amount;
    let balanceFavor = 0;
    
    // Manejar saldo a favor o exceso de pago
    if (newPending < 0) {
      balanceFavor = Math.abs(newPending);
      newPending = 0;
    }
    
    // Actualizar saldo del vale
    await prisma.voucher.update({
      where: { id: voucherId },
      data: {
        pending: newPending,
        status: newPending === 0
      }
    });
    
    // Si hay saldo a favor, actualizar cliente
    if (balanceFavor > 0) {
      await prisma.client.update({
        where: { id: voucher.clientId },
        data: {
          balanceFavor: { increment: balanceFavor }
        }
      });
    }
    
    // Crear registro de pago
    const payment = await prisma.payment.create({
      data: {
        amount,
        lastPay: new Date(),
        voucherId
      }
    });
    
    return {
      payment: {
        paymentId: payment.id,
        amount: payment.amount.toNumber(),
        lastPay: payment.lastPay,
        voucherId: payment.voucherId
      },
      newBalance: newPending,
      balanceFavor
    };
  } catch (error: any) {
    throw new Error('Error al registrar pago: ' + error.message);
  }
};
