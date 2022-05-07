import { Request, Response } from 'express';
import { ImportService } from '../../services/import/import.service';

const Controller = {
  importProducts: async (req: Request, res: Response) => {
    const file = req.file;
    const importService = new ImportService();
    if (file) {
      try {
        const result = await importService.importProducts(file);
        if (result) {
          return res.status(200).json({ success: true, data: [] });
        } else {
          return res.status(400).json({ success: false, message: 'An error occurred' });
        }
      } catch (err) {
        console.error(err);
        return res.status(400).json({ success: false, message: 'An error occurred' });
      }
    } else {
      return res.status(400).json({ success: false, message: 'An error occurred' });
    }
  },

  importCategories: async (req: Request, res: Response) => {},
};

export const ImportController = Controller;
