FROM node:8

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 80

CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "start" ]