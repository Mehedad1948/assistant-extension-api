FROM node:20.12.0-alpine

# Create App directory

WORKDIR '/usr/app'


COPY package.json .

RUN npm install 

COPY . .

EXPOSE 7777

CMD ["npm", "start"]