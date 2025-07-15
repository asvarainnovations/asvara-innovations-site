# Install dependencies only when needed
FROM node:22 AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
COPY prisma ./prisma
RUN npm ci --unsafe-perm --jobs=1

# Rebuild the source code only when needed
FROM node:22 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate Prisma client (for debian-openssl-1.1.x)
RUN npx prisma generate
# Build Next.js app
RUN npm run build

# Production image, copy all files and run next
FROM node:22 AS runner
WORKDIR /app
ENV NODE_ENV production

# Add a non-root user to run the app
RUN addgroup --gid 1001 nodejs && adduser --uid 1001 --gid 1001 --disabled-password nextjs

# Install libssl1.1 for Prisma compatibility
RUN apt-get update && apt-get install -y libssl1.1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env.production ./.env

USER nextjs

# Cloud Run expects the app to listen on $PORT
ENV PORT 8080
EXPOSE 8080

CMD ["npx", "next", "start"]