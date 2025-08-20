# FinSavvy - Financial Management Application

A modern financial management application built with React frontend, Node.js backend, and MongoDB database, fully containerized with Docker.

## 🏗️ Architecture

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Reverse Proxy**: Nginx
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Docker and Docker Compose installed
- Make (optional, for easier command execution)
- Node.js (if running without Docker)

## 🚀 Quick Start

### Using Make Commands (Recommended)

#### Development Environment

```bash
# Build all services for development
make docker-build-dev

# Start development environment
make dev-up

# View logs
make dev-logs

# Stop development environment (preserves database)
make dev-down

# Restart services
make dev-restart
```

#### Production Environment

```bash
# Build all services for production
make docker-build-prod

# Start production environment
make prod-up

# View logs
make prod-logs

# Stop production environment (preserves database)
make prod-down

# Restart services
make prod-restart
```

#### Individual Service Building

```bash
# Development
make docker-build-dev-frontend
make docker-build-dev-backend
make docker-build-dev-nginx

# Production
make docker-build-prod-frontend
make docker-build-prod-backend
make docker-build-prod-nginx
```

### Using Docker Compose Commands Directly

#### Development Environment

```bash
# Build all services
docker compose -f docker-compose.yml -f docker-compose.dev.yml build

# Start services
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Stop services
docker compose -f docker-compose.yml -f docker-compose.dev.yml down

# Restart services
docker compose -f docker-compose.yml -f docker-compose.dev.yml restart
```

#### Production Environment

```bash
# Build all services
docker compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start services
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# View logs
docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f

# Stop services
docker compose -f docker-compose.yml -f docker-compose.prod.yml down

# Restart services
docker compose -f docker-compose.yml -f docker-compose.prod.yml restart
```

## 🔧 Configuration

### Environment Files

Create the following environment files:

#### Client Environment Files

**`client/.env` (Development)**
```bash
VITE_BACKEND_URL=http://localhost:80
```

**`client/.env.prod` (Production)**
```bash
VITE_BACKEND_URL=https://your-production-domain.com
```

#### Server Environment Files

**`server/.env` (Development)**
```bash
NODE_ENV=development
MONGODB_URI=mongodb://db:27017/finsavvy_dev
JWT_SECRET=your-jwt-secret-dev
PORT=5000
```

**`server/.env.prod` (Production)**
```bash
NODE_ENV=production
MONGODB_URI=mongodb://db:27017/finsavvy_prod
JWT_SECRET=your-strong-jwt-secret-prod
PORT=5000
```

#### Root Environment File

**`.env`**
```bash
API_URL=http://localhost
# Add other global environment variables here
```

## 📁 Project Structure

```
FinSavvy/
├── client/                 # React frontend
│   ├── Dockerfile
│   ├── .env
│   └── .env.prod
├── server/                 # Node.js backend
│   ├── Dockerfile
│   ├── .env
│   └── .env.prod
├── docker/
│   └── nginx/             # Nginx configuration
│       └── Dockerfile
├── docker-compose.yml     # Base compose configuration
├── docker-compose.dev.yml # Development overrides
├── docker-compose.prod.yml# Production overrides
├── Makefile              # Make commands
└── README.md
```

## 🌐 Access Points

### Development
- **Application**: http://localhost
- **Backend API**: http://localhost/api (proxied through Nginx)
- **MongoDB**: mongodb://localhost:27017

### Production
- **Application**: http://your-domain.com
- **Backend API**: http://your-domain.com/api
- **MongoDB**: Internal network only

## 🛠️ Development Workflow

1. **Start development environment**:
   ```bash
   make dev-up
   ```

2. **Make code changes**: Files are automatically synced via volumes

3. **View logs** to monitor changes:
   ```bash
   make dev-logs
   ```

4. **Restart specific services** if needed:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.dev.yml restart frontend
   docker compose -f docker-compose.yml -f docker-compose.dev.yml restart backend
   ```

## 🚀 Production Deployment

1. **Set up production environment variables**

2. **Build and start production environment**:
   ```bash
   make docker-build-prod
   make prod-up
   ```

3. **Monitor logs**:
   ```bash
   make prod-logs
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 5000, and 27017 are available

2. **Permission issues**: Run with sudo if needed:
   ```bash
   sudo make dev-up
   ```

3. **Database connection issues**: Ensure MongoDB container is running:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.dev.yml ps db
   ```

4. **Environment variables not loaded**: Check if `.env` files exist and are properly formatted

### Useful Commands

```bash
# Check running containers
docker ps

# Check container logs
docker logs app-frontend
docker logs app-backend
docker logs app-nginx
docker logs app-db

# Execute commands in containers
docker exec -it app-backend bash
docker exec -it app-frontend sh

# Clean up unused Docker resources
docker system prune -a
```

## 📝 Notes

- The development environment includes hot reloading for both frontend and backend
- Database data persists between container restarts via Docker volumes
- Nginx serves as a reverse proxy routing requests to appropriate services
- Production builds are optimized for performance and security