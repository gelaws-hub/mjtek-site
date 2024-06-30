import { Request, Response } from 'express';
import SubKategori from '../../models/SubKategori';

export const getAllSubKategori = async (req: Request, res: Response): Promise<void> => {
  try {
    const subKategori = await SubKategori.findAll();
    res.status(200).json(subKategori);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getSubKategoriById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const subKategori = await SubKategori.findById(parseInt(id));
    res.status(200).json(subKategori);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createSubKategori = async (req: Request, res: Response): Promise<void> => {
  const { nama_sub_kategori } = req.body;
  try {
    const subKategori = await SubKategori.create({ nama_sub_kategori });
    res.status(201).json(subKategori);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateSubKategori = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nama_sub_kategori } = req.body;
  try {
    const subKategori = await SubKategori.update(parseInt(id), { nama_sub_kategori });
    res.status(200).json(subKategori);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteSubKategori = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await SubKategori.delete(parseInt(id));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
