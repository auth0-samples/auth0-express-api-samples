#!/usr/bin/env bash
docker build -t auth0-express-api-hs256 .
docker run --env-file .env -p 3010:3010 -it auth0-express-api-hs256
