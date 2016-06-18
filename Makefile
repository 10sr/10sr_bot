.PHONY: set-tokens

set-tokens: secret.sh
	. secret.sh && ssh dokku@conoha config:set 10sr_bot \
		TWITTER_KEY=$$TWITTER_KEY \
		TWITTER_SECRET=$$TWITTER_SECRET \
		TWITTER_TOKEN=$$TWITTER_TOKEN \
		TWITTER_TOKEN_SECRET=$$TWITTER_TOKEN_SECRET
