from google.appengine.ext import ndb

###############################
# Handle ndb database
class TwitterToken(ndb.Model):
    """Model for twitter oauth tokens."""
    oauth_token = ndb.StringProperty(indexed=False, default=None)
    oauth_secret = ndb.StringProperty(indexed=False, default=None)
