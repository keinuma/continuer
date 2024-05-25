FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN pnpm install turbo --global
COPY . .
RUN turbo prune api --docker


FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/out/full/apps/api/prisma/ ./apps/api/
RUN pnpm install --frozen-lockfile
RUN cd apps/api && pnpm prisma generate

COPY --from=deps /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=api...


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder /app .

EXPOSE 3001
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/api/dist/main.js"]
