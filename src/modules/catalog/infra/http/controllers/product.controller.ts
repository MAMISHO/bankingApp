import { Request, Response } from 'express';
import { ProductRepositoryService } from '../../../../../loader';

const Controller = {
  getProducts: async (req: Request, res: Response) => {
    try {
      const result = await ProductRepositoryService.findAll({});
      if (result) {
        return res.status(200).json({ success: true, data: result });
      } else {
        return res.status(400).json({ success: false, message: 'An error occurred' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ success: false, message: 'An error occurred' });
    }
  },

  importCategories: async (req: Request, res: Response) => {},
};

export const ProductController = Controller;
