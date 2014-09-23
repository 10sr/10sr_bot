import webapp2

import datetime

from twbot import MyTwitter, config


##################################
# request handlers
class _BaseHandler(webapp2.RequestHandler):
    """Base class for TWBot."""
    pass

class Periodic(_BaseHandler):

    def get(self):
        t = MyTwitter(config.TW_ID)
        t.statuses.update(status="Auth succeeded at {}"
                          .format(str(datetime.datetime.now())))
        self.response.write("hell!")
        return

class Root(_BaseHandler):

    def get(self):

        t = MyTwitter(config.TW_ID)

        tl = t.statuses.home_timeline()

        from pprint import pformat
        self.response.write("<pre>")
        self.response.write(pformat(tl))
        self.response.write("</pre>")

        # key value test
        from twbot import db
        self.response.write("<pre>")
        self.response.write(db.get("add"))
        self.response.write("</pre>")

        db.put("bcd", "def")
        self.response.write("<pre>")
        self.response.write(db.get("bcd"))
        self.response.write("</pre>")

        #self.response.write(len(token_entity.oauth_token))
        # user = users.get_current_user()

        # if user:
        #     self.response.headers['Content-Type'] = 'text/plain'
        #     self.response.write('Hello, {}!'.format(user.nickname()))

        # else :
        #     self.redirect(users.create_login_url(self.request.uri))
        return
