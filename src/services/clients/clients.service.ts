import type { NewClientType } from '../../types/clientType';
import type { newComissionType } from '../../types/comissionType';
import { prisma } from '../../config/database'

// Obtener todos los clientes
export const getAllClients = async () => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        clientScheme: true,
      }
    });
    
    // Mapear los clientes y mostrar los datos necesarios
    return clients.map(client => ({
      clientId: client.id,
      fullName: client.fullName,
      balanceFavor: client.balanceFavor.toNumber(),
      commissionSchemes: client.clientScheme
    }));
  } catch (error) {
    throw new Error('Error al obtener clientes: ' + error);
  }
};

// Obtener cliente por ID
export const getClientById = async (clientId: number) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        clientScheme: true,
      }
    });
    
    if (!client) throw new Error('Cliente no encontrado');
    
    return {
      clientId: client.id,
      fullName: client.fullName,
      balanceFavor: client.balanceFavor.toNumber(),
      commissionSchemes: client.clientScheme
    };
  } catch (error: any) {
    throw new Error('Error al obtener el cliente: ' + error.message);
  }
};

// Crear cliente
export const createClient = async (newClient: NewClientType) => {
  try {
    const { fullName } = newClient;

    const client = await prisma.client.create({
      data: {
        fullName,
        balanceFavor: 0
      },
      include: {
        clientScheme: true
      }
    });
    
    return {
      clientId: client.id,
      fullName: client.fullName,
      balanceFavor: client.balanceFavor.toNumber(),
      commissionSchemes: client.clientScheme
    };
  } catch (error: any) {
    throw new Error('Error al crear cliente: ' + error.message);
  }
};

// Agregar esquema de comisión
export const addCommissionScheme = async (newScheme: newComissionType) => {
  try {
    const { dayMin, dayMax, percentage, clientId } = newScheme;

    const scheme = await prisma.comissionScheme.create({
      data: {
        dayMin,
        dayMax,
        percentage,
        clientId
      }
    });
    
    return {
      comissionId: scheme.id,
      dayMin: scheme.dayMin,
      dayMax: scheme.dayMax,
      percentage: scheme.percentage.toNumber(),
      clientId: scheme.clientId
    };
  } catch (error: any) {
    throw new Error('Error al agregar esquema de comisión: ' + error.message);
  }
};

// Obtener esquemas de comisión por cliente
export const getCommissionSchemes = async (clientId: number) => {
  try {
    const schemes = await prisma.comissionScheme.findMany({
      where: { clientId }
    });
    
    return schemes.map(scheme => ({
      comissionId: scheme.id,
      dayMin: scheme.dayMin,
      dayMax: scheme.dayMax,
      percentage: scheme.percentage.toNumber(),
      clientId: scheme.clientId
    }));
  } catch (error: any) {
    throw new Error('Error al obtener esquemas de comisión: ' + error.message);
  }
};