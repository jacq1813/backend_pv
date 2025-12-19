// src/services/commission.service.ts
import { prisma } from '../../config/database';

// Calcular comisión para un vale pagado
export const calculateCommission = async (voucherId: number) => {
  try {
    const voucher = await prisma.voucher.findUnique({
      where: { id: voucherId },
      include: {
        client: {
          include: {
            clientScheme: true
          }
        },
        payment: {
          orderBy: { lastPay: 'desc' },
          take: 1
        }
      }
    });
    
    if (!voucher) throw new Error('Vale no encontrado');
    if (!voucher.status) throw new Error('El vale no está completamente pagado');
    if (!voucher.payment.length) throw new Error('No hay pagos registrados');
    

    // ---------- Logica para calcular la comisión ----------
    // Obtener fecha del último pago
    const lastPayment = voucher.payment[0];
    
    // Calcular días transcurridos
    const diffTime = Math.abs(lastPayment.lastPay.getTime() - voucher.createDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Buscar el esquema aplicable al caso actual
    const applicableScheme = voucher.client.clientScheme.find(scheme => {
      const minCondition = diffDays >= scheme.dayMin;
      const maxCondition = scheme.dayMax ? diffDays <= scheme.dayMax : true;
      return minCondition && maxCondition;
    });
    
    // Calcular comisión
    const commissionPercentage = applicableScheme ? applicableScheme.percentage.toNumber() / 100 : 0;
    const commissionAmount = voucher.total.toNumber() * commissionPercentage;
    
    return {
      voucherId,
      totalAmount: voucher.total.toNumber(),
      daysElapsed: diffDays,
      commissionPercentage: commissionPercentage * 100,
      commissionAmount,
      netAmount: voucher.total.toNumber() - commissionAmount,
      applicableScheme: applicableScheme ? {
        dayMin: applicableScheme.dayMin,
        dayMax: applicableScheme.dayMax,
        percentage: applicableScheme.percentage.toNumber()
      } : null
    };
  } catch (error: any) {
    throw new Error('Error al calcular comisión: ' + error.message);
  }
};