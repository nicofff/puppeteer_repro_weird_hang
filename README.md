### How to run
```bash
docker run --platform linux/amd64 -i --init --rm ghcr.io/puppeteer/puppeteer:latest node -e "$(cat index.mjs)"
```

It's not 100% consistent, you might need to run it multiple times.