#Node immage
FROM node:latest
#Set working directory
WORKDIR /usr/app
#Copy package.json
COPY ./package.json ./
#Install dependencies
RUN npm install
#Copy everything else
COPY ./ ./
#Expose port
EXPOSE 3000
#Default command
CMD ["node", "index.js"]

