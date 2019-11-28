#!/bin/bash

this_help() {
	echo
	echo '============================[ vortexy build tool ]============================'
	echo '-h | help  : This help.'
	echo '-c | clear : Remove an existing "build" directory.'
	echo '-b | build : Compile project files.'
	echo '-i | install : Same as "npm install" inside the directory "build".'
	echo '-ss | start-server : Same as run "npm run server" inside the directory "build".'
	echo '-sw | start-web : Same as run "npm run web" inside the directory "build".'
	echo '=============================================================================='
	echo
}

clear() {
	if [ -d "$DIRECTORY" ]; then
		rm -R ./build
	fi
}

build() {
	cd ./src
	npx tsc
	cp -R ./web ../build/ &
	cp -R ./server ../build/ &
	cp ./package/package.json ../build/
	cd ..
}

autoinstall() {
	cd ./build
	npm install
	cd ..
}

startweb() {
	cd ./build
	clear
	npm run web
}

startserver() {
	cd ./build
	clear
	npm run server
}

CLEAR=false
BUILD=false
AUTO_INSTALL=false
START_WEB=false
START_SERVEr=false

for arg; do
	case "$arg" in
	clear)
		CLEAR=true
		;;
	-c)
		CLEAR=true
		;;
	build)
		BUILD=true
		;;
	-b)
		BUILD=true
		;;
	install)
		AUTO_INSTALL=true
		;;
	-i)
		AUTO_INSTALL=true
		;;
	start-web)
		START_WEB=true
		;;
	-sw)
		START_WEB=true
		;;
	start-server)
		START_SERVER=true
		;;
	-ss)
		START_SERVER=true
		;;
	help)
		this_help
		;;
	-h)
		this_help
		;;
	*)
		echo "Unknown argument"
		exit 1
		;;
	esac
done

if [ "$CLEAR" = true ]; then
	clear
fi

if [ "$BUILD" = true ]; then
	build
fi

if [ "$AUTO_INSTALL" = true ]; then
	autoinstall
fi

if [ "$START_WEB" = true ]; then
	startweb
fi

if [ "$START_SERVER" = true ]; then
	startserver
fi
