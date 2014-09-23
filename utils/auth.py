#!/usr/bin/env python2

import sys, os, os.path
import datetime

CONSUMER_KEY = "0B1WZuWtcqdNmmnpzkzQSwnP8"

def main(argv):
    from os.path import normpath, join, dirname, realpath
    rootdir = normpath(join(dirname(realpath(__file__)), ".."))
    sys.path.insert(0, rootdir)

    import twitter as tw

    TOKEN_FILE = join(rootdir, "tokens.lst")

    if not os.path.exists(TOKEN_FILE):
        tw.oauth_dance("10sr_bot", CONSUMER_KEY, CONSUMER_SECRET,
                       TOKEN_FILE)

    oauth_token, oauth_secret = tw.read_token_file(TOKEN_FILE)

    with open(join(rootdir, "consumer_secret.txt")) as f:
        consumer_secret = f.read().strip()

    # print(repr(oauth_token))
    # print(repr(oauth_secret))

    t = tw.Twitter(auth=tw.OAuth(oauth_token, oauth_secret,
                                 CONSUMER_KEY, consumer_secret))
    t.statuses.update(status="Auth succeeded at {}"
                      .format(str(datetime.datetime.now())))
    print("Auth succeeded with tokens in {}".format(TOKEN_FILE))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
