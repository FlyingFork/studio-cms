# Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
ENV HUSKY=0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN pnpm build

# Runner
FROM node:22-alpine AS runner
WORKDIR /app
ARG PORT=3000
ENV PORT=$PORT
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
USER nextjs
EXPOSE $PORT
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]