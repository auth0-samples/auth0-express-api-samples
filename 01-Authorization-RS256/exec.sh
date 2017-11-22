#!/usr/bin/env bash
docker build -t auth0-express-api-rs256 .
docker run --env-file .env -p 3010:3010 -it auth0-express-api-rs256
