import { Request, Response } from 'express';
import { ImportService } from '../../../../../loader';
import { LoadProcessRequestDTO } from '../../../dtos/load-process-request.dto';
import { LoadProcessDTO } from '../../../dtos/load-process.dto';

const Controller = {
  importProducts: async (req: Request, res: Response) => {
    const file = req.file;
    const impReq: LoadProcessRequestDTO = new LoadProcessRequestDTO(req.body);
    if (file && impReq && impReq.uploadType) {
      impReq.file = file;
      try {
        switch (impReq.uploadType) {
          case 'PRODUCT':
            const result: LoadProcessDTO = await ImportService.importProducts(impReq);
            return res.status(200).json({ success: result.status, data: result });
          case 'CATEGORY':
          // result = await ImportService.importCategories(impReq.file);
          // break;
          case 'LABORATORY':
          // result = await ImportService.importLaboratories(impReq.file);
          // break;
          default:
            return res.status(400).json({ success: false, message: 'An error occurred', data: null });
        }
      } catch (err) {
        console.error(err);
        return res.status(400).json({ success: false, message: 'An error occurred', data: null });
      }
    } else {
      return res.status(400).json({ success: false, message: 'An error occurred', data: null });
    }
  },

  importCategories: async (req: Request, res: Response) => {},
};

export const ImportController = Controller;
