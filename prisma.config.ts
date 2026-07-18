import 'dotenv/config';
import { defineConfig } from 'prisma/config';

import { z } from 'zod';

const prismaEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const url = process.env.SKIP_ENV_VALIDATION
  ? (process.env.DATABASE_URL ?? 'postgresql://build:build@localhost:5432/build')
  : prismaEnvSchema.parse(process.env).DATABASE_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url,
  },
});