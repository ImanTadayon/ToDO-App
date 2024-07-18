FROM node:alpine

COPY . /app

WORKDIR /app

RUN npm install --legacy-peer-deps

CMD ["npm", "start"]



# در صورت برخورد با خطای فونت  در پوشه فرانت اول این فرمان را برای نصب نیازمندی ها اجرا کنید تا تصویر فرانت ساخته شود
#  docker-compose build frontend