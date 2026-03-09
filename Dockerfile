FROM node:20-slim
WORKDIR /app

RUN apt-get update \
    && apt-get install -y dumb-init ca-certificates chromium \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROME_BIN="/usr/bin/chromium"

COPY package*.json ./
RUN npm ci

COPY index.mjs ./

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.mjs"]
