# ========================================
# Multi-stage Dockerfile for ReactJS + Node.js
# Support: Development & Production
# ========================================

# ========================================
# DEVELOPMENT STAGE
# ========================================
FROM node:22-alpine AS development
WORKDIR /usr/src/app

# Install necessary dependencies for npm and Node.js modules

RUN apk update && apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    ca-certificates curl git procps \
    && ln -sf python3 /usr/bin/python

# Copy application dependency manifests
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig*.json ./

# Install ALL dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Create necessary directories and set permissions
RUN chown -R node:node /usr/src/app && \
    chmod -R 755 /usr/src/app

EXPOSE 5000

CMD ["npm", "run", "start"]

# ========================================
# PRODUCTION STAGE
# ========================================
FROM node:22-alpine AS production
WORKDIR /usr/src/app

# Install necessary dependencies for npm and Node.js modules
RUN apk update && apk add --no-cache dumb-init \
    libc6-compat \
    python3 \
    make \
    g++ \
    ca-certificates curl git procps \
    && ln -sf python3 /usr/bin/python

# Copy application dependency manifests
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig*.json ./

# Install ALL dependencies
RUN npm install --production

# Bundle app source
COPY --chown=node:node . .

# Create necessary directories and set permissions
RUN chown -R node:node /usr/src/app && \
    chmod -R 755 /usr/src/app

EXPOSE 5000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start"]