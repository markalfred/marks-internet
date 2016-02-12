import Twit from 'twit'

class Tweeter {
  constructor ({ consumerKey, consumerSecret, accessToken, accessTokenSecret }) {
    this.T = new Twit({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: accessToken,
      access_token_secret: accessTokenSecret
    })
  }

  tweet (message) {
    this.T.post('statuses/update', { status: message }, err => {
      if (err) { throw err }
    })
  }
}

export default Tweeter
