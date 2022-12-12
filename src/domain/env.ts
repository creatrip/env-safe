import { Process } from '../adapter/process';
import { Dotenv } from '../adapter/dotenv';
import { Key } from './key-storage';

export class Env {
  private path: string;
  private data: Map<string, string | number | boolean> = new Map();

  static create(path: string): Env {
    const instance: Env = new Env();
    instance.path = path;
    const data: { [name: string]: string } = Dotenv.load(path);
    for (const name in data) {
      if (data[name] !== '') {
        instance.data.set(name, data[name]);
      }
    }
    return instance;
  }

  updateDefaultValue(keys: Key[]): this {
    for (const key of keys) {
      if (!this.data.has(key.name) && key.default !== undefined) {
        this.data.set(key.name, key.default);
      }
    }
    return this;
  }

  castingAllValue(keys: Key[]): this {
    const errorMessages: string[] = [];
    for (const key of keys) {
      const originalValue: string | number | boolean | undefined = this.data.get(key.name);
      if (originalValue === undefined) {
        // not found error
        if (key.nullable) {
          this.data.set(key.name, null);
        } else {
          errorMessages.push(`ERROR: ${this.path} - "${key.name}" is not defined`);
        }
        continue;
      }
      const castedValue: any = this.castingValue(originalValue, key);
      if (castedValue === undefined) {
        // type casting error
        errorMessages.push(`ERROR: ${this.path} - "${key.name}" is not allowed`);
        continue;
      }
      this.data.set(key.name, castedValue);
    }
    if (errorMessages.length >= 1) Process.kill(errorMessages);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  toUserEnvClass(userEnvClass: Function): this {
    for (const key of this.data.keys()) {
      userEnvClass[key] = this.data.get(key);
    }
    return this;
  }

  private castingValue(value: any, key: Key): any {
    value = String(value);
    switch (key.type) {
      case Boolean:
        if (value === 'true') return true;
        else if (value === 'false') return false;
        else return undefined;

      case Number:
        const castedValue: number = key.type(value);
        if (isNaN(castedValue)) return undefined;
        else return castedValue;

      default:
        return key.type(value);
    }
  }
}
