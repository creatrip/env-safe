import { EnvKey, EnvSafe } from '../../src';

describe('casting', () => {
  test('[Success]', async () => {
    // Given
    // When
    @EnvSafe({ path: 'test/casting/.env' })
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
    expect(Env.ENVIRONMENT).toBe('test');
    expect(Env.DATABASE_USER).toBe('creatrip');
    expect(Env.DATABASE_PORT).toBe(3306);
    expect(Env.DATABASE_SYNC).toBe(true);
  });
});
