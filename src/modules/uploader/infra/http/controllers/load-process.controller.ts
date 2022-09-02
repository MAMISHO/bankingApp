import { Request, Response } from 'express';
import { LoadProcessRepositoryService } from '../../../../../loader';

const Controller = {
  getProcess: async (req: Request, res: Response) => {
    try {
      const result = await LoadProcessRepositoryService.findAll({});
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
};

export const LoadProcessController = Controller;
