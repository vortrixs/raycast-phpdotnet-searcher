# raycast-phpdotnet-searcher
Raycast extension for looking up documentation using php.net's search functionality

## Building through Docker
```shell
docker run -w /opt/project -v ".:/opt/project" -ti node:22 bash
```

```shell
npm install
```

```shell
npm run build -- -e dist -o ./build
```