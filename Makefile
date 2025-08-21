# Variables
include .env

###################
# DEVELOPMENT
###################
docker-build-dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml build

docker-build-dev-nginx:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml build nginx --no-cache

docker-build-dev-backend:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml build backend --no-cache

docker-build-dev-frontend:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml build frontend --no-cache

# Run commands
dev-up:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

dev-down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml stop $(filter-out db, $(shell docker compose -f docker-compose.yml -f docker-compose.dev.yml config --services))
	docker compose -f docker-compose.yml -f docker-compose.dev.yml rm -f $(filter-out db, $(shell docker compose -f docker-compose.yml -f docker-compose.dev.yml config --services))

dev-logs:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

dev-restart:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml restart

###################
# PRODUCTION
###################
docker-build-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml build

docker-build-prod-nginx:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml build nginx --no-cache

docker-build-prod-backend:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml build backend --no-cache

docker-build-prod-frontend:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml build frontend --no-cache

# Run commands
prod-up:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

prod-down:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml stop $(filter-out db, $(shell docker compose -f docker-compose.yml -f docker-compose.prod.yml config --services))
	docker compose -f docker-compose.yml -f docker-compose.prod.yml rm -f $(filter-out db, $(shell docker compose -f docker-compose.yml -f docker-compose.prod.yml config --services))

prod-logs:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f

prod-restart:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml restart