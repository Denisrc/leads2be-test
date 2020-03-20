FROM node:12

WORKDIR /srv 

COPY ["package.json", "yarn.lock", "./"]

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
