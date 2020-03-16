FROM node:8

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3003
CMD [ "npm", "run", "dev" ]