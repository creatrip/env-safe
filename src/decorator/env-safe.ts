import { loadEnv } from '../usecase/load-env';

interface EnvSafeOptions {
  path?: string;
}

export function EnvSafe(options: EnvSafeOptions = {}): ClassDecorator {
  options = { path: '.env', ...options };
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (envClass: Function): void => {
    loadEnv({ path: options.path, userEnvClass: envClass });
  };
}
