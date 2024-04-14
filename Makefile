ORGANIZATION := dailypay
PROJECT := hackathon
SERVICE := daily-ar

VERSION ?= latest

SCRIPTS_DIR := $(PWD)/scripts
DB_DIR := $(PWD)/db
DB_FILE := $(DB_DIR)/hackathon.db

COMPOSE_FILE := docker-compose.yaml
DOCKER_BUILDER_INSTANCE := $(ORGANIZATION)-builder
DOCKER_BUILD_TARGET ?= final

DATABASE_FILE := $(DB_DIR)/hackathon.db

build:
	@VERSION=$(VERSION) \
	SERVICE=$(SERVICE) \
	DOCKER_BUILD_TARGET=$(DOCKER_BUILD_TARGET) \
	docker compose \
	-f $(COMPOSE_FILE) \
	build

up:
	@VERSION=$(VERSION) \
	SERVICE=$(SERVICE) \
	DOCKER_BUILD_TARGET=local \
	docker compose \
	-f $(COMPOSE_FILE) \
	up -d --build

logs:
	@VERSION=$(VERSION) \
	SERVICE=$(SERVICE) \
	DOCKER_BUILD_TARGET=local \
	docker compose \
	-f $(COMPOSE_FILE) \
	logs -f

restart:
	@VERSION=$(VERSION) \
	SERVICE=$(SERVICE) \
	DOCKER_BUILD_TARGET=local \
	docker compose \
	-f $(COMPOSE_FILE) \
	restart

down:
	@VERSION=$(VERSION) \
	SERVICE=$(SERVICE) \
	DOCKER_BUILD_TARGET=local \
	docker compose \
	-f $(COMPOSE_FILE) \
	down

push: create-builder-instance
	@VERSION=$(VERSION) \
	SERVICE=$(SERVICE) \
	DOCKER_BUILD_TARGET=$(DOCKER_BUILD_TARGET) \
	docker buildx bake \
	-f $(COMPOSE_FILE) \
	--push

pull:
	@VERSION=$(VERSION) \
	SERVICE=$(SERVICE) \
	DOCKER_BUILD_TARGET=$(DOCKER_BUILD_TARGET) \
	docker compose \
	-f $(COMPOSE_FILE) \
	pull

create-builder-instance:
	@if ! docker buildx ls | grep -q ^$(DOCKER_BUILDER_INSTANCE); then \
		docker buildx create --name $(DOCKER_BUILDER_INSTANCE) --use --bootstrap; \
	fi

db/clean:
	@rm $(DB_FILE)
	@touch $(DB_FILE)

deploy:
	@VERSION=$(VERSION) \
	bash $(SCRIPTS_DIR)/deploy.sh

ecslogs:
	@bash $(SCRIPTS_DIR)/ecslogs.sh
