import { KeyStorage } from '../domain/key-storage';

interface SetEnvKeyDeclarationInput {
  objectName: string;
  propertyName: string;
  type: any;
  defaultValue: any;
  nullable: boolean;
}

export function setEnvKeyDeclaration(input: SetEnvKeyDeclarationInput): void {
  const { objectName, propertyName, type, defaultValue, nullable } = input;
  KeyStorage.add(objectName, {
    name: propertyName,
    type: type,
    default: defaultValue,
    nullable: nullable,
  });
}
