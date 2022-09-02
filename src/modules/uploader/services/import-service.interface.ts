/**
 * ref: https://stackoverflow.com/questions/58431076/how-to-use-async-await-with-fs-createreadstream-in-node-js
 * 
 https://www.bezkoder.com/integrate-angular-10-node-js/
 */
export interface IImportService {
  importProducts(file: Express.Multer.File): Promise<boolean | undefined>;
}
