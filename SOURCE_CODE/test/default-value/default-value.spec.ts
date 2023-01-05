import { EnvKey, EnvSafe } from '../../src';

describe('default-value', () => {
  test('[Success]', async () => {
    // Given
    // When
    @EnvSafe({ path: 'test/default-value/.env' })
    class Env {
      @EnvKey({ default: 'development' })
      static ENVIRONMENT: 'test' | 'local' | 'development' | 'production';

      @EnvKey({ default: 'root' })
      static DATABASE_USER: string;

      @EnvKey({ default: 3456 })
      static DATABASE_PORT: number;

      @EnvKey({ default: false })
      static DATABASE_SYNC: boolean;
    }

    // Then
    expect(Env.ENVIRONMENT).toBe('development');
    expect(Env.DATABASE_USER).toBe('root');
    expect(Env.DATABASE_PORT).toBe(3456);
    expect(Env.DATABASE_SYNC).toBe(false);
  });
});
