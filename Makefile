.PHONY: deploy

appname := 10sr_bot

dokku_repo := dokku@d.10sr.f5.si:$(appname)

dokku := ssh -t dokku@d.10sr.f5.si

deploy:
	git push $(dokku_repo) master

create:
	$(dokku) apps:create $(appname)

logs:
	$(dokku) logs $(appname)
