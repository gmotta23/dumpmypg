dev:
	docker-compose up

deploy:
	docker build --no-cache -t gmtcdocker/dumpmypg .
	docker push gmtcdocker/dumpmypg:latest

start:
	docker rm -f dumpmypg && docker run -d --name dumpmypg --rm -p 3025:3000 -v dumpmypgdata:/app/data gmtcdocker/dumpmypg

stop:
	docker stop dumpmypg