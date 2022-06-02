# prerender-docker

Lightweight Prerender container built on Alpine Linux with Node and Headless Chrome.

- Prerender ^5.20
- Chromium 99.0.4844.84
- Node 18.x

## Requirements

- Docker

## Usage

Pull and run the image:

```
docker pull veneliniliev/prerender-docker:1.0.0
docker run -p 3000:3000 veneliniliev/prerender-docker:1.0.0
```
Prerender will now be running on http://localhost:3000. Try the container out with curl:

```
curl http://localhost:3000/render?url=https://www.example.com/
```

## Prerender plugins

A few default plugins have been activated by default (see `server.js`):
- https://github.com/prerender/prerender/blob/master/lib/plugins/blacklist.js
  - env: BLACKLISTED_DOMAINS="blocked.domain.com"
- https://github.com/prerender/prerender/blob/master/lib/plugins/sendPrerenderHeader.js
- https://github.com/prerender/prerender/blob/master/lib/plugins/blockResources.js
- https://github.com/prerender/prerender/blob/master/lib/plugins/httpHeaders.js
- https://github.com/prerender/prerender/blob/master/lib/plugins/blockResources.js
- https://github.com/prerender/prerender/blob/master/lib/plugins/removeScriptTags.js
- https://github.com/prerender/prerender/blob/master/lib/plugins/whitelist.js
  - env: ALLOWED_DOMAINS="allowed.domain.com"
- https://github.com/JonathanBennett/prerender-redis-cache
  - env to enable plugin: REDISTOGO_URL || REDISCLOUD_URL || REDISGREEN_URL || REDIS_URL
  - env: PAGE_TTL

This can be modified by creating your own `server.js` and mounting this file as a docker volume:

```
docker run -p 3000:3000 -v $(pwd)/server.js:/home/node/server.js veneliniliev/prerender-docker:1.0.0
```

## Prerender memory cache

The [prerender-memory-cache](https://github.com/prerender/prerender-memory-cache) plugin is not activated by default.
You can activate it with the environment variable `MEMORY_CACHE=1`.

You can customize cache behavior with environment variables :
- CACHE_MAXSIZE=1000 : max number of objects in cache
- CACHE_TTL=6000 : time to live in seconds

```
docker run -p 3000:3000 -e MEMORY_CACHE=1 -e CACHE_MAXSIZE=1000 -e CACHE_TTL=6000 veneliniliev/prerender-docker:1.0.0 
```

## Prerender documentation

Check out the official Prerender documentation: https://github.com/prerender/prerender
