import * as csv from 'fast-csv';
import * as fs from 'fs';
import { IProduct } from '../../models/products/product';

/**
 * ref: https://stackoverflow.com/questions/58431076/how-to-use-async-await-with-fs-createreadstream-in-node-js
 * 
 https://www.bezkoder.com/integrate-angular-10-node-js/
 */
export class ImportService {
  public async importProducts(file: Express.Multer.File): Promise<boolean | undefined> {
    const products = new Array<IProduct>();
    if (file) {
      // const data = fs.readFileSync(file.path);
      let rowsCount = 0;
      const parseOptions = {
        ignoreEmpty: true,
        discardUnmappedColumns: true,
        headers: true,
        delimiter: ';',
      };
      const parse = csv.parse(parseOptions);

      const transform = csv.format<IProduct, IProduct>(parseOptions).transform((row: IProduct, next: any) => {
        console.log(row);
        products.push(row);
        rowsCount++;
        next();
      });

      try {
        await fs
          .createReadStream(file.path)
          .pipe(parse)
          .pipe(transform)
          .on('error', (error) => {
            console.error(error);
            // return res.status(400).json({ success: false, message: 'An error occurred' });
            return Promise.reject(false);
          })
          .on('data', (data) => console.log('data'))
          .on('end', () => {
            console.log('end');
            fs.unlinkSync(file.path);
            return Promise.resolve(true);
          });
        return Promise.resolve(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      return Promise.reject(false);
    }
  }
}
