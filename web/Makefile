WEB_BASE_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))

web-build:
	cd $(WEB_BASE_DIR) && tsc

web-watch:
	cd $(WEB_BASE_DIR) && tsc --watch

#this makefile handles all tasks related to building and testing frontend part

