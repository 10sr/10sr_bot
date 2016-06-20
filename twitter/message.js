class Message {
  constructor(msg){
    if (!msg) {
      throw new Error("msg is empty!");
    }
    this.raw = msg;

    try {
      this.created_at = new Date(Date.parse(msg.created_at));
    } catch (e) {
      console.log(e.toString());
      this.created_at = null;
    }
    this.text = msg.text || "";
    this.user = msg.user && msg.user.ascreen_name || "";
    this.id = msg.id || 0;

    if (msg.entities) {
      this.hashTags = msg.entities.hashtags.map(elem => elem.text) || [];
      this.mentions = msg.entities.user_mentions.map(elem => elem.screen_name) ||
        [];
    } else {
      this.hashTags = this.mentions = [];
    }

    this.isMentionToMe = this.mentions.indexOf("10sr_bot") >= 0;
  }
}

module.exports = Message;


// Sample payloads

var _SampleMsg = {
  "created_at": "Sat Jun 18 14:15:01 +0000 2016",
  "id": 744171564371869700,
  "id_str": "744171564371869697",
  "text": "@10sr_bot いきてる？",
  "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": 2578716006,
  "in_reply_to_user_id_str": "2578716006",
  "in_reply_to_screen_name": "10sr_bot",
  "user": {
    "id": 73722749,
    "id_str": "73722749",
    "name": "10sr",
    "screen_name": "10sr",
    "location": "日本",
    "url": "http://github.com/10sr",
    "description": "のーみそ水洗いしたい",
    "protected": false,
    "verified": false,
    "followers_count": 169,
    "friends_count": 280,
    "listed_count": 7,
    "favourites_count": 1149,
    "statuses_count": 22923,
    "created_at": "Sat Sep 12 20:06:22 +0000 2009",
    "utc_offset": 32400,
    "time_zone": "Tokyo",
    "geo_enabled": false,
    "lang": "en",
    "contributors_enabled": false,
    "is_translator": false,
    "profile_background_color": "131516",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme14/bg.gif",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme14/bg.gif",
    "profile_background_tile": true,
    "profile_link_color": "1F1157",
    "profile_sidebar_border_color": "EEEEEE",
    "profile_sidebar_fill_color": "EFEFEF",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "profile_image_url": "http://pbs.twimg.com/profile_images/663392142497198081/SYTheP9K_normal.png",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/663392142497198081/SYTheP9K_normal.png",
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "is_quote_status": false,
  "retweet_count": 0,
  "favorite_count": 0,
  "entities": {
    "hashtags": [],
    "urls": [],
    "user_mentions": [
      {
        "screen_name": "10sr_bot",
        "name": "10sr_bot",
        "id": 2578716006,
        "id_str": "2578716006",
        "indices": [
          0,
          9
        ]
      }
    ],
    "symbols": []
  },
  "favorited": false,
  "retweeted": false,
  "filter_level": "low",
  "lang": "ja",
  "timestamp_ms": "1466259301642"
};

// Entities are a bit complex
// https://dev.twitter.com/overview/api/entities-in-twitter-objects
