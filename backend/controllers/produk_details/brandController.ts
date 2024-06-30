import { Request, Response } from 'express';
import Brand from '../../models/Brand';

export const getAllBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const brand = await Brand.findAll();
    res.status(200).json(brand);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getBrandById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(parseInt(id));
    res.status(200).json(brand);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createBrand = async (req: Request, res: Response): Promise<void> => {
  const { nama_brand } = req.body;
  try {
    const brand = await Brand.create({ nama_brand });
    res.status(201).json(brand);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateBrand = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nama_brand } = req.body;
  try {
    const brand = await Brand.update(parseInt(id), { nama_brand });
    res.status(200).json(brand);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteBrand = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Brand.delete(parseInt(id));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
