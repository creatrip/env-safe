import { Process } from '../../src/adapter/process';
import { EnvKey, EnvSafe } from '../../src';

jest.mock('../../src/adapter/process');

describe('not-defined-error', () => {
  test('[Fail]', async () => {
    // Given

    // When
    @EnvSafe({ path: 'test/not-defined-error/.env' })
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
        `ERROR: test/not-defined-error/.env - "DATABASE_USER" is not defined`,
        `ERROR: test/not-defined-error/.env - "DATABASE_PORT" is not defined`,
        `ERROR: test/not-defined-error/.env - "DATABASE_SYNC" is not defined`,
      ]),
    );
  });
});
