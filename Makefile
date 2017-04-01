.PHONY: start start-local

start:
	npm start

start-local:
	./start_local.sh

docker-local:
	docker build . -t local/10sr_bot
	docker run -p 5000 local/10sr_bot ./start_local.sh

