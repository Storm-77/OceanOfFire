SERVER_BASE_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))

server-build:
	cd $(SERVER_BASE_DIR) && go build -o $(SERVER_BASE_DIR)bin/server $(SERVER_BASE_DIR)cmd/prod/main.go

server-dev-build:
	cd $(SERVER_BASE_DIR) && go build -o $(SERVER_BASE_DIR)bin/server-dev $(SERVER_BASE_DIR)cmd/dev/dev.go

server-build-and-run: server-dev-build
	cd $(SERVER_BASE_DIR) && ./bin/server-dev
	
# todo add exec which starts api only server for development
