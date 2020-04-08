application:
	yarn install
	if [ "$(ENV)" = "development" ] ; then \
		./node_modules/nodemon/bin/nodemon.js index.js ; \
	else \
		pm2 start index.js ; \
		pm2 logs ; \
	fi
