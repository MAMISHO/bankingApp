import { Request, Response } from 'express';
import { ImportService } from '../../../../../loader';

const Controller = {
  importProducts: async (req: Request, res: Response) => {
    const file = req.file;
    if (file) {
      try {
        const result = await ImportService.importProducts(file);
        if (result) {
          return res.status(200).json({ success: true, data: true });
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
