# Step 1: Build the app
FROM node:18 as build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app (replace "build" with your build script if necessary)
RUN npm run build

# Step 2: Prepare the production image
FROM node:14 as production
WORKDIR /usr/src/app

# Copy built files from the previous stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Install Puppeteer dependencies (you might need additional libraries depending on your OS)
RUN apt-get update && apt-get install -y libx11-xcb1 libxcb1 libxcomposite1 libxdamage1 libxi6 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libasound2 libatk1.0-0 libatk-bridge2.0-0 libpangocairo-1.0-0 libgtk-3-0

# Set environment variables if needed (e.g., PORT, NODE_ENV, etc.)
ENV NODE_ENV=production

# Expose the port your Express app is listening on (replace 3000 with your actual port number)
EXPOSE 3000

# Start your Express app (replace "start" with the command used to start your app)
CMD ["npm", "start"]
