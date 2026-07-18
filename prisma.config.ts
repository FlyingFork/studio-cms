import 'dotenv/config';
import { defineConfig } from 'prisma/config';

import { z } from 'zod';

const prismaEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const env = prismaEnvSchema.parse(process.env);

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});