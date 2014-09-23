from google.appengine.ext import ndb

###############################
# Handle ndb database
class TwitterToken(ndb.Model):
    """Model for twitter oauth tokens."""
    oauth_token = ndb.StringProperty(indexed=False, default=None)
    oauth_secret = ndb.StringProperty(indexed=False, default=None)


#################################
# key value
class _KeyValue(ndb.Model):
    """General perpose key-value storage."""
    value = ndb.StringProperty(indexed=False, default=None)

def get(key):
    try:
        return _KeyValue.get_by_id(str(key)).value
    except AttributeError:
        return None

def put(key, value):
    return _KeyValue(id=str(key), value=str(value)).put()
