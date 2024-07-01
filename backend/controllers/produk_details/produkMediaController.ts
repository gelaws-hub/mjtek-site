import { Request, Response } from 'express';
import Media from '../../models/ProdukMedia';

export const getAllMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const media = await Media.findAll();
    res.status(200).json(media);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getMediaById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const media = await Media.findById(parseInt(id));
    res.status(200).json(media);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createMedia = async (req: Request, res: Response): Promise<void> => {
  const { id_produk, sumber, tipe_file } = req.body;
  try {
    const media = await Media.create({ id_produk, sumber, tipe_file });
    res.status(201).json(media);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Media.delete(parseInt(id));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
