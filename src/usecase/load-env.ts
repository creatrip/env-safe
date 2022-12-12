import { Env } from '../domain/env';
import { FileSystem } from '../adapter/file-system';
import { Key, KeyStorage } from '../domain/key-storage';

interface LoadEnvInput {
  path: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  userEnvClass: Function;
}

export function loadEnv(input: LoadEnvInput): void {
  const { path, userEnvClass } = input;
  const keys: Key[] = KeyStorage.find(userEnvClass.name);
  if (!FileSystem.isFileExist(path)) {
    FileSystem.createFile(path, keys.map((key: Key) => key.name).join('=\n') + '=\n');
  }
  Env.create(path).updateDefaultValue(keys).castingAllValue(keys).toUserEnvClass(userEnvClass);
}
