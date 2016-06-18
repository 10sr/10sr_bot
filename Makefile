.PHONY: set-tokens deploy

dokku := ssh -t dokku@conoha

deploy:
	git push dokku@conoha:10sr_bot master

set-tokens: secret.sh
	. secret.sh && $(dokku) config:set 10sr_bot \
		TWITTER_KEY=$$TWITTER_KEY \
		TWITTER_SECRET=$$TWITTER_SECRET \
		TWITTER_TOKEN=$$TWITTER_TOKEN \
		TWITTER_TOKEN_SECRET=$$TWITTER_TOKEN_SECRET
