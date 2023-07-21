FROM node:18-alpine AS final

# --- START ---

RUN apk add --no-cache chromium ca-certificates
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

# --- END ---

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json .
COPY package-lock.json .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]