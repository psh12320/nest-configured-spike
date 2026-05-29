ARG NODE=node:24-alpine
ARG APP_DIR=/app

FROM ${NODE} AS base
WORKDIR ${APP_DIR}
RUN apk add --no-cache dumb-init ca-certificates

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM deps AS builder
COPY . .
RUN pnpm build

FROM deps AS dev
COPY . .
CMD ["pnpm", "start:dev"]

FROM node:24-alpine AS prod
WORKDIR ${APP_DIR}
RUN apk add --no-cache dumb-init ca-certificates
COPY --from=builder ${APP_DIR}/dist ./dist
COPY --from=deps ${APP_DIR}/node_modules ./node_modules
COPY package.json ./
EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
