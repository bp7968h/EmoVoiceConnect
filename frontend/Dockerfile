FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_BASE_URL=https://emovoiceconnect.trustfirst.social

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]
