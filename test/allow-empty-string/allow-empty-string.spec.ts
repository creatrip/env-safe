import { EnvKey, EnvSafe } from '../../src';

describe('allow-empty-string', () => {
  test('[Success]', async () => {
    // Given
    // When
    @EnvSafe({ path: 'test/allow-empty-string/.env' })
    class Env {
      @EnvKey()
      static MESSAGE: string;
    }

    // Then
    expect(Env.MESSAGE).toBe('');
  });
});
