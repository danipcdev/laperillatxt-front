FROM node:16.15.0

WORKDIR /var/www/html

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 4000

CMD ["yarn", "dev"]