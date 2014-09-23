# from google.appengine.api import users
from google.appengine.ext import ndb
import webapp2

import datetime

import twitter as tw


# unsafe?
CONSUMER_KEY = "0B1WZuWtcqdNmmnpzkzQSwnP8"

TW_ID = "10sr_bot"

###############################
# Handle ndb database
class TwitterToken(ndb.Model):
    """Model for twitter oauth tokens."""
    oauth_token = ndb.StringProperty(indexed=False, default=None)
    oauth_secret = ndb.StringProperty(indexed=False, default=None)


##################################
# request handlers
class _TWBOTHandler(webapp2.RequestHandler):
    """Base class for TWBot."""
    pass


class MainPage(_TWBOTHandler):

    def get(self):
        # http://blog.vier.jp/2013/02/google-app-engine-appengine-ja-night-23.html
        token_entity = TwitterToken.get_by_id(TW_ID)
        if token_entity == None:
            token_entity = TwitterToken(id=TW_ID)
            token_entity.put()


        # why values are enclosed by whitespaces?
        oauth_token = token_entity.oauth_token.strip()
        oauth_secret = token_entity.oauth_secret.strip()

        with open("./consumer_secret.txt") as f:
            consumer_secret = f.read().strip()

        t = tw.Twitter(auth=tw.OAuth(oauth_token, oauth_secret,
                                     CONSUMER_KEY, consumer_secret))
        t.statuses.update(status="Auth succeeded at {}"
                          .format(str(datetime.datetime.now())))

        self.response.write("hell!")
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
        self.response.write("hell!")
        return



app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/periodic', Periodic),
], debug=True)
