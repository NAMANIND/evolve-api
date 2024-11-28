FROM node:18-alpine

WORKDIR /usr/src/app

# Install curl (since it's not included by default in Alpine)
RUN apk --no-cache add curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "run", "start"]
