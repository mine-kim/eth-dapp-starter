ARG NODE_VERSION=20.12.2

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app

################################################################################
# Create a stage for installing production dependecies.
FROM base as dev

COPY ./package.json ./

RUN npm install

COPY . .

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD ["npm", "run", "dev2"]


################################################################################
# Create a stage for installing production dependecies.
FROM base as prod

COPY ./package.json ./

RUN npm install

COPY . .

# Run the build script.
RUN npm run build \
    && npm install -g pm2

# Expose the port that the application listens on.
EXPOSE 3002

# Run the application.
CMD ["npm", "run", "start"]
