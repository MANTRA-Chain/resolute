ARG NEXT_PUBLIC_APP_API_URI=/api

FROM node:20-alpine AS builder

RUN corepack enable

# Use the node user from the image (instead of the root user)
USER node

# Create app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN yarn install --immutable

# Bundle app source
COPY --chown=node:node . .

RUN yarn build

FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy the bundled code from the build stage to the production image
COPY --chown=nobody:nobody --from=builder /app/node_modules ./node_modules
COPY --chown=nobody:nobody --from=builder /app/.next .

USER nobody
EXPOSE 3000

# Start the server using the production build
CMD [ "yarn", "start" ]
