# from google.appengine.api import users
import webapp2

from twbot import handler as hl

app = webapp2.WSGIApplication([
    ('/', hl.Root),
    ('/periodic/', hl.Periodic),
], debug=True)
