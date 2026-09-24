ARG REGISTRY=docker.io
FROM ${REGISTRY}/node:22.22.0-alpine3.23 AS builder
WORKDIR /build
RUN npm install -g pnpm@9.15.4
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM ${REGISTRY}/nginx:stable-alpine
ENV API_UPSTREAM=http://prism-fusion-site:3280
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /build/dist/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1/healthz || exit 1
