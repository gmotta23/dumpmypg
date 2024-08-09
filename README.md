# DumpMyPG

<h3>DumpMyPG is a web based UI for managing PostgreSQL dumps</h3>

[Dockerhub](https://hub.docker.com/r/gmtcdocker/dumpmypg)

## 🐳 Docker

### Prerequisite

- Docker installed

### Run with

    docker run -d --rm -p 3025:3000 gmtcdocker/dumpmypg

### (Recommended) For persisting data, run with

    docker rm -f dumpmypg && docker run -d --name dumpmypg --rm -p 3025:3000 -v dumpmypgdata:/app/data gmtcdocker/dumpmypg


