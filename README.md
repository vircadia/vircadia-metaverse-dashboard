# Metaverse Dashboard (Codename Iamus)

**Notice: Marked for deprecation, will be replaced with https://github.com/vircadia/vircadia-web/ which will include both this dashboard's features and a full featured web client for visiting virtual worlds in Vircadia. As a result, this repository is currently being maintained but no new features are being added.**

## Deployment

A consideration for deployment is that this is an SPA (single page application) and therefore will require a simple server-side [configuration](https://router.vuejs.org/guide/essentials/history-mode.html) change in the case of a page refresh.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Docker
This creates a docker image called `metaverse-dashboard` that can be used with docker-compose at `vircadia-domain-server-docker`. This image also can be used for development purposes.

### docker Build
In order to build, go to the `docker` dir and execute the build script.
```bash
cd docker && docker-build.sh
```

### docker run
In order to run a container based on the image, go to the `docker` dir and execute the run script.
```bash
cd docker && run-metaverse-dashboard.sh
```
Port 8080 will be open and its log can be found in the `log` dir.
