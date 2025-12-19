// src/types/clientType.ts
export type ClientType = {
    clientId: number;
    fullName: string;
    balanceFavor: number;
    vouchers: Array<{}>
    commissionSchemes: Array<{}> 
};

// new client type
export type NewClientType = Omit<ClientType, 'clientId' | 'balanceFavor' | 'vouchers' | 'commissionSchemes'> ;