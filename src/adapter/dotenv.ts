import { config } from 'dotenv';

export class Dotenv {
  static load(path: string): { [name: string]: string } {
    return config({ path: path })?.parsed ?? {};
  }
}
