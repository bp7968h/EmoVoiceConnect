FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3001

ENV EMOTION_DETECT='http://127.0.0.1:5000/predict'
ENV NODE_ENV=development

CMD ["node", "main.js"]
