export type ComissionType = {
    comissionId: number;
    dayMin : number;
    dayMax : number;
    percentage : number;
    clientId: number;
};

export type newComissionType = Omit<ComissionType, 'comissionId'>