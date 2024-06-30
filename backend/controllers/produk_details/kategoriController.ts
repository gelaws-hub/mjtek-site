import { Request, Response } from 'express';
import Kategori from '../../models/Katagori';

export const getAllKategori = async (req: Request, res: Response): Promise<void> => {
  try {
    const kategori = await Kategori.findAll();
    res.status(200).json(kategori);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getKategoriById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const kategori = await Kategori.findById(parseInt(id));
    res.status(200).json(kategori);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createKategori = async (req: Request, res: Response): Promise<void> => {
  const { nama_kategori } = req.body;
  try {
    const kategori = await Kategori.create({ nama_kategori });
    res.status(201).json(kategori);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateKategori = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nama_kategori } = req.body;
  try {
    const kategori = await Kategori.update(parseInt(id), { nama_kategori });
    res.status(200).json(kategori);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteKategori = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Kategori.delete(parseInt(id));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
