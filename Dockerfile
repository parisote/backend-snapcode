FROM node:18
ARG DATABASE_URL
ENV NODE_ENV production
ENV DATABASE_URL ${DATABASE_URL}

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm config set unsafe-perm true
RUN npm install --production
COPY . .
EXPOSE 4000
RUN npx prisma generate
CMD ["npm", "run", "start"]