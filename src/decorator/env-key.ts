import 'reflect-metadata';
import { setEnvKeyDeclaration } from '../usecase/set-env-key-declaration';

interface EnvKeyOptions {
  default?: any;
  nullable?: boolean;
  description?: string;
}

export function EnvKey(options: EnvKeyOptions = {}): PropertyDecorator {
  options = { default: undefined, nullable: false, description: undefined, ...options };
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Function, propertyName: string): void => {
    setEnvKeyDeclaration({
      objectName: object.name,
      propertyName: propertyName,
      type: Reflect.getMetadata('design:type', object, propertyName),
      defaultValue: options.default,
      nullable: options.nullable,
    });
  };
}
