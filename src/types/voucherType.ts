export type VoucherType = {
    voucherId: number;
    total: number;
    pending: number;
    createDate: Date;
    paymentDate: Date;
    status: boolean; // true = INACTIVO, false = ACTIVO [cite: 49]
    clientId: number;
};

// new voucher type
export type NewVoucherType = Omit<VoucherType, 'voucherId'> ;
