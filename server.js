'use strict';

const prerender = require('prerender');

const server = prerender({
    chromeFlags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars', '--disable-dev-shm-usage'],
    forwardHeaders: true,
    chromeLocation: '/usr/bin/chromium-browser'
});

const memCache = Number(process.env.MEMORY_CACHE) || 0;
if (memCache === 1) {
    console.debug('Memory cache is activated!');
    server.use(require('prerender-memory-cache'));
}

if (process.env.BLACKLISTED_DOMAINS) {
    console.debug('Blacklist plugin is activated!');
    server.use(prerender.blacklist());
}

server.use(prerender.httpHeaders());
server.use(prerender.removeScriptTags());
server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());

if (process.env.ALLOWED_DOMAINS) {
    console.debug('Whitelist plugin is activated!');
    server.use(prerender.whitelist());
}

if (process.env.REDISTOGO_URL ||
    process.env.REDISCLOUD_URL ||
    process.env.REDISGREEN_URL ||
    process.env.REDIS_URL) {
    console.debug('Redis cache plugin is activated!');
    server.use(require('prerender-redis-cache'));
}


server.start();
