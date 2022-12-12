import * as fs from 'fs';

export class FileSystem {
  static isFileExist(path: string): boolean {
    return fs.existsSync(path);
  }

  static createFile(path: string, text: string): void {
    fs.writeFileSync(path, text, { encoding: 'utf-8' });
  }
}
