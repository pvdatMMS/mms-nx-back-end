FROM ubuntu:18.04

RUN apt-get update -y && apt-get install -y \
	supervisor \
	curl \
	make \
	gnupg

COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install nodejs -y
RUN npm install -g yarn pm2

WORKDIR /code
COPY package.json /code
RUN yarn install
COPY . /code

ENV ENV=development \
	DB_HOST=nx-mysql \
	DB_PORT=3306 \
	DB_DATABASE=application \
	DB_USERNAME=root \
	DB_PASSWORD=password \
	secretKey=MMS_NX_APPLICATION

CMD ["/usr/bin/supervisord"]