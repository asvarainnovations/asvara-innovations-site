# ────────────────────────────────────────────────────────────────────────────────
# 1) BUILDER
# ────────────────────────────────────────────────────────────────────────────────
FROM node:18-slim AS builder

WORKDIR /usr/src/app

# install OS certs + any native deps (for Prisma, OpenSSL, etc)
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# copy package + lock, install deps
COPY package.json package-lock.json ./
RUN npm ci

# copy all source & build
COPY . .
RUN npm run build



# ────────────────────────────────────────────────────────────────────────────────
# 2) RUNTIME
# ────────────────────────────────────────────────────────────────────────────────
FROM node:18-slim AS runner

WORKDIR /usr/src/app

# copy the standalone server bundle + node_modules
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

# ────────────────────────────────────────────────────────────────────────────────
# *** IMPORTANT: bring in all of Next.js’s static assets + your public folder ***
# ────────────────────────────────────────────────────────────────────────────────
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

# ensure env is production
ENV NODE_ENV=production
EXPOSE 8080

# the standalone entrypoint
CMD ["node", "server.js"]
