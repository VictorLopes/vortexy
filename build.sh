#!/bin/bash

this_help() {
  echo
  echo '============================[ vortexy build tool ]============================'
  echo '-h | --help  : This help.'
  echo '-c | --clear : Remove an existing "build" directory.'
  echo '-b | --build : Compile and make a directory colled "build" with project files.'
  echo '-i | --auto-install : Same as "npm install" inside the directory "build".'
  echo '-s | --start : Same as "npm start" inside the directory "build".'
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
  cp -R ./web/* ../build
  cd ..
}

autoinstall() {
  cd ./build
  npm install
  cd ..
}

start() {
  cd ./build
  clear
  npm start
}

CLEAR=false
BUILD=false
AUTO_INSTALL=false
START=FALSE

for arg; do
  case "$arg" in
  --clear)
    CLEAR=true
    ;;
  -c)
    CLEAR=true
    ;;
  --build)
    BUILD=true
    ;;
  -b)
    BUILD=true
    ;;
  --auto-install)
    AUTO_INSTALL=true
    ;;
  -i)
    AUTO_INSTALL=true
    ;;
  --start)
    START=true
    ;;
  -s)
    START=true
    ;;
  --help)
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

if [ "$START" = true ]; then
  start
fi
