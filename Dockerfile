FROM alpine:latest

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
ENV MEMORY_CACHE=0

# install chromium, tini and clear cache
RUN apk add --update-cache chromium tini nodejs npm \
 && rm -rf /var/cache/apk/* /tmp/*

# Set user and group
ARG user=prerender
ARG group=prerender
ARG uid=1000
ARG gid=1000
RUN addgroup -g ${gid} ${group}
RUN adduser -D -u ${uid} -G ${group} -s /bin/sh -h /prerender ${user}

# Switch to user
USER ${uid}:${gid}

WORKDIR "/prerender"

COPY ./package.json .
COPY ./server.js .

# install npm packages
RUN npm install --no-package-lock

# kernel/OS version
RUN uname -a

# node version
RUN node -v

# chromium version
RUN chromium-browser --version

EXPOSE 3000

ENTRYPOINT ["tini", "--"]
CMD ["node", "server.js"]
