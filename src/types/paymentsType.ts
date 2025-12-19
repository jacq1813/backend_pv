export type PaymentType = {
    paymentId: number;
    amount: number;
    lastPay: Date;
    voucherId: number;
};

// new payment type
export type NewPaymentType = Omit<PaymentType, 'paymentId'> ;