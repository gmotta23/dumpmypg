FROM node:18-alpine

ARG COMMAND=start
ENV COMMAND=$COMMAND

EXPOSE 3000

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN apk add postgresql

USER node

COPY --chown=node:node . .

RUN npm install

RUN if [ "$COMMAND" = "start" ] ; then npm run build ; fi

CMD sh -c "npm run $COMMAND"