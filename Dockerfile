ARG NODE_VERSION=20.12.2

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app

# Expose the port that the application listens on.
EXPOSE 3001

################################################################################
# Create a stage for installing production dependecies.
FROM base as dev

COPY ./package.json ./

RUN npm install

COPY . /app/

CMD ["npm", "run", "dev"]