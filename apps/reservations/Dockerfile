# Use the official Node.js alpine image as a base image
FROM node:alpine AS development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install npm globally and install dependencies
RUN npm install -g npm
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use another stage for production
FROM node:alpine AS production

# Set environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install npm globally and install production dependencies
RUN npm install -g npm
RUN npm install --prod

# Copy built files from the development stage to the production stage
COPY --from=development /usr/src/app/dist ./dist

# Specify the default command to run the application
CMD ["node", "dist/app/reservations/main"]
