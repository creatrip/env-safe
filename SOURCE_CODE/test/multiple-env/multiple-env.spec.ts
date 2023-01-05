import { EnvKey, EnvSafe } from '../../src';

describe('multiple-env', () => {
  test('[Success]', async () => {
    // Given
    // When
    @EnvSafe({ path: 'test/multiple-env/aws.env' })
    class AWSEnv {
      @EnvKey()
      static ACCOUNT_ID: number;

      @EnvKey()
      static IS_ADMIN: boolean;

      @EnvKey()
      static ACCESS_KEY_ID: string;

      @EnvKey()
      static SECRET_ACCESS_KEY: string;

      @EnvKey()
      static REGION: string;
    }

    @EnvSafe({ path: 'test/multiple-env/database.env' })
    class DatabaseEnv {
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
    expect(AWSEnv.ACCOUNT_ID).toBe(1);
    expect(AWSEnv.IS_ADMIN).toBe(false);
    expect(AWSEnv.ACCESS_KEY_ID).toBe('access key id');
    expect(AWSEnv.SECRET_ACCESS_KEY).toBe('secret access key');
    expect(AWSEnv.REGION).toBe('ap-northeast-2');
    expect(DatabaseEnv.ENVIRONMENT).toBe('test');
    expect(DatabaseEnv.DATABASE_USER).toBe('creatrip');
    expect(DatabaseEnv.DATABASE_PORT).toBe(3306);
    expect(DatabaseEnv.DATABASE_SYNC).toBe(true);
  });
});
