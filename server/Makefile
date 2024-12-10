SERVER_BASE_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))

server-build:
	cd $(SERVER_BASE_DIR) && go build -o $(SERVER_BASE_DIR)bin/server $(SERVER_BASE_DIR)cmd/main.go

server-build-and-run: server-build
	cd $(SERVER_BASE_DIR) && ./bin/server
	
# todo add exec which starts api only server for development
