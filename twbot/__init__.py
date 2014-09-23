#!/usr/bin/env python2

import twitter as tw

from twbot import db, config

##################################
# My Twitter class

class MyTwitter(tw.Twitter):
    def __init__(self, tid, *args, **kargs):
        # http://blog.vier.jp/2013/02/google-app-engine-appengine-ja-night-23.html
        token_entity = db.TwitterToken.get_by_id(tid)
        if token_entity == None:
            token_entity = db.TwitterToken(id=tid)
            token_entity.put()

        oauth_token = token_entity.oauth_token
        oauth_secret = token_entity.oauth_secret

        with open("./consumer_secret.txt") as f:
            consumer_secret = f.read().strip()

        tw.Twitter.__init__(self,
                            *args,
                            auth=tw.OAuth(oauth_token, oauth_secret,
                                          config.CONSUMER_KEY, consumer_secret),
                            **kargs)
        return
