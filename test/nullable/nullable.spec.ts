import { EnvKey, EnvSafe } from '../../src';

describe('nullable', () => {
  test('[Success]', async () => {
    // Given
    // When
    @EnvSafe({ path: 'test/nullable/.env' })
    class Env {
      @EnvKey({ nullable: true })
      static ENVIRONMENT: 'test' | 'local' | 'development' | 'production';

      @EnvKey({ nullable: true })
      static DATABASE_USER: string | null;

      @EnvKey({ nullable: true })
      static DATABASE_PORT: number | null;

      @EnvKey({ nullable: true })
      static DATABASE_SYNC: boolean | null;
    }

    // Then
    expect(Env.ENVIRONMENT).toBe('test');
    expect(Env.DATABASE_USER).toBeNull();
    expect(Env.DATABASE_PORT).toBeNull();
    expect(Env.DATABASE_SYNC).toBeNull();
  });
});
