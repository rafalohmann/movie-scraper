FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=80
EXPOSE $PORT
CMD ["npm", "run", "dev"]
