<img src="https://avatars.githubusercontent.com/u/21240036?s=200&v=4" alt="env-safe" align="right" width="110" />

<h1><a href="https://www.npmjs.com/package/@creatrip/env-safe">env-safe</a></h1>

<!-- Badges -->

[![CI](https://github.com/creatrip/env-safe/actions/workflows/ci.yml/badge.svg)](https://github.com/creatrip/env-safe/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@creatrip/env-safe.svg)](https://www.npmjs.com/package/@creatrip/env-safe)
<img alt="NPM Download" src="https://img.shields.io/npm/dw/@creatrip/env-safe">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/creatrip/env-safe">

**env-safe** is module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env) with type-safe. And can also validate the type of [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). **env-safe** is dependent on [dotenv](https://www.npmjs.com/package/dotenv) and [reflect-metadata](https://www.npmjs.com/package/reflect-metadata).

<!-- Introduce -->

## Install

```sh
npm intall @creatrip/env-safe --save
```

Or installing with yarn? `yarn add @creatrip/env-safe`

## Usage

Turn on `emitDecoratorMetadata`, `experimentalDecorators` in tsconfig.json:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
    ...
  }
  ...
}
```

Create a `.env` file in the root of your project:

```dosini
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

Use env-safe to create env config class:

```typescript
import { EnvSafe, EnvKey } from '@creatrip/env-safe';

@EnvSafe()
export class Env {
  @EnvKey()
  static DATABASE_HOST: string;

  @EnvKey()
  static DATABASE_PORT: number;
}
```

> filename: env.ts

That's it. Just use the newly created config class:

```typescript
import { Env } from './env.ts';

mysql.connect({
  host: Env.DATABASE_HOST, // String("localhost")
  port: Env.DATABASE_PORT, // Number(3306)
});
```

## Documentation

### Comment

Comments may be added to your file on their own line or inline:

```dosini
# This is a comment
DATABASE_HOST="localhost" # comment
DATABASE_PASSWORD="can-define-with-#"
```

Comments begin where a `#` exists, so if your value contains a `#` please wrap it in quotes.

### Default value

Set default value to env config class property:

```typescript
@EnvSafe()
export class Env {
  @EnvKey({ default: 'localhost' })
  static DATABASE_HOST: string;

  @EnvKey({ default: 3306 })
  static DATABASE_PORT: number;
}
```

### Nullable

Set nullable to env config class property:

```typescript
@EnvSafe()
export class Env {
  @EnvKey({ nullable: true })
  static DATABASE_HOST: string | null; // String or null
}
```

### Type-Safe

Since the provided `.env` does not contain all the variables defined in env config class, an exception is thrown:

```dosini
DATABASE_HOST=
DATABASE_PORT="wrong data"
```

```typescript
@EnvSafe()
export class Env {
  @EnvKey()
  static DATABASE_HOST: string; // Not defined Error

  @EnvKey()
  static DATABASE_PORT: number; // NaN Error

  @EnvKey()
  static DATABASE_USER: string; // Not defined Error
}
```

```sh
$ node dist/index.js

ERROR: .env - DATABASE_HOST is not defined
ERROR: .env - DATABASE_PORT is not allowed
ERROR: .env - DATABASE_USER is not defined
```

### Change `.env` path

Can change `.env` path in your project:

```sh
$ ls
development.env  stagging.env  production.env
```

```typescript
@EnvSafe({ path: 'development.env' })
export class Env {
  ...
}
```

### Multiple env config class

Can define multiple env config class:

```dosini
AWS_SECRET_KEY="secret key"
S3_BUCKET="bucket name"
```

```typescript
@EnvSafe()
export class EnvAWS {
  @EnvKey()
  static AWS_SECRET_KEY: string; // String("secret key")
}

@EnvSafe()
export class EnvS3 {
  @EnvKey()
  static S3_BUCKET: string; // String("bucket name")
}
```

### Auto generate template .env

If you don't make .env, automatically generate .env with template:

https://user-images.githubusercontent.com/25793226/205256885-1ba27e5d-ec98-4c9a-95be-418a81c28138.mov

## Contributing Guide

See [CONTRIBUTING.md](https://github.com/creatrip/env-safe/blob/main/CONTRIBUTING.md)
