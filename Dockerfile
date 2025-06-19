FROM node:22.14-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY src ./src
RUN npm run build

FROM node:22.14-alpine AS release

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

ENV NODE_ENV=production

RUN npm ci --omit-dev --ignore-scripts

ENTRYPOINT ["node", "dist/index.js"]
