FROM node:18
ENV NODE_ENV production

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm config set unsafe-perm true
RUN npm install --production
COPY . .
EXPOSE 4000
RUN npx prisma generate
RUN npx prisma migrate deploy
CMD ["npm", "run", "start"]