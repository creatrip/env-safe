import { Process } from '../../src/adapter/process';
import { EnvKey, EnvSafe } from '../../src';

jest.mock('../../src/adapter/process');

describe('type-error', () => {
  test('[Fail]', async () => {
    // Given

    // When
    @EnvSafe({ path: 'test/type-error/.env' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Env {
      @EnvKey()
      static ENVIRONMENT: 'test' | 'local' | 'development' | 'production';

      @EnvKey()
      static DATABASE_USER: string;

      @EnvKey()
      static DATABASE_PORT: number;

      @EnvKey()
      static DATABASE_SYNC: boolean;
    }

    // Then
    expect(Process.kill).toHaveBeenCalledWith(
      expect.arrayContaining([
        `ERROR: test/type-error/.env - "DATABASE_PORT" is not allowed`,
        `ERROR: test/type-error/.env - "DATABASE_SYNC" is not allowed`,
      ]),
    );
  });
});
