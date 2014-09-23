# from google.appengine.api import users
from google.appengine.ext import ndb
import webapp2

import datetime

import twitter as tw


TW_ID = "10sr_bot"
CONSUMER_KEY = "0B1WZuWtcqdNmmnpzkzQSwnP8"

###############################
# Handle ndb database
class TwitterToken(ndb.Model):
    """Model for twitter oauth tokens."""
    oauth_token = ndb.StringProperty(indexed=False, default=None)
    oauth_secret = ndb.StringProperty(indexed=False, default=None)



##################################
# My Twitter class

class _MyTwitter(tw.Twitter):
    def __init__(self, twitter_id, *args, **kargs):
        # http://blog.vier.jp/2013/02/google-app-engine-appengine-ja-night-23.html
        token_entity = TwitterToken.get_by_id(twitter_id)
        if token_entity == None:
            token_entity = TwitterToken(id=twitter_id)
            token_entity.put()

        oauth_token = token_entity.oauth_token
        oauth_secret = token_entity.oauth_secret

        with open("./consumer_secret.txt") as f:
            consumer_secret = f.read().strip()

        tw.Twitter.__init__(self,
                            *args,
                            auth=tw.OAuth(oauth_token, oauth_secret,
                                          CONSUMER_KEY, consumer_secret),
                            **kargs)
        return


##################################
# request handlers
class _TWBOTHandler(webapp2.RequestHandler):
    """Base class for TWBot."""
    pass


class MainPage(_TWBOTHandler):

    def get(self):

        t = _MyTwitter(TW_ID)

        tl = t.statuses.home_timeline()

        from pprint import pformat
        self.response.write("<pre>")
        self.response.write(pformat(tl))
        self.response.write("</pre>")

        #self.response.write(len(token_entity.oauth_token))
        # user = users.get_current_user()

        # if user:
        #     self.response.headers['Content-Type'] = 'text/plain'
        #     self.response.write('Hello, {}!'.format(user.nickname()))

        # else :
        #     self.redirect(users.create_login_url(self.request.uri))
        return


class Periodic(_TWBOTHandler):

    def get(self):
        t = _MyTwitter(TW_ID)
        t.statuses.update(status="Auth succeeded at {}"
                          .format(str(datetime.datetime.now())))
        self.response.write("hell!")
        return



app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/periodic/', Periodic),
], debug=True)
