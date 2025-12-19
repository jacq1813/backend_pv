// src/controllers/clients.controller.ts
import { Request, Response } from 'express';
import * as clientService from '../../services/clients/clients.service';

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getAllClients();
    res.json({
      success: true,
      data: clients
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.id);
    const client = await clientService.getClientById(clientId);
    res.json({
      success: true,
      data: client
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const newClient = req.body;
    const client = await clientService.createClient(newClient);
    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const addCommissionScheme = async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const schemeData = { ...req.body, clientId };
    const scheme = await clientService.addCommissionScheme(schemeData);
    res.status(201).json({
      success: true,
      data: scheme
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const getCommissionSchemes = async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const schemes = await clientService.getCommissionSchemes(clientId);
    res.json({
      success: true,
      data: schemes
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};