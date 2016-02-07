'use strict'
require('dotenv').config();

const logger = console.log
const SpeedTest = require('speedtest-net')
const Twit = require('twit')

const DOWN_LIMIT = parseFloat(process.env.DOWN_LIMIT)
const UP_LIMIT = parseFloat(process.env.UP_LIMIT)
const BUFFER = parseFloat(process.env.BUFFER)
const ISP = process.env.ISP
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET

if (DOWN_LIMIT && UP_LIMIT && BUFFER && ISP) {
  // crickets
} else {
  let err =
    `One or more required vars not set!
    DOWN_LIMIT: ${DOWN_LIMIT}
    UP_LIMIT: ${UP_LIMIT}
    BUFFER: ${BUFFER}
    ISP: ${ISP}
    TWITTER_CONSUMER_KEY: ${TWITTER_CONSUMER_KEY}
    TWITTER_CONSUMER_SECRET: ${TWITTER_CONSUMER_SECRET}
    TWITTER_ACCESS_TOKEN: ${TWITTER_ACCESS_TOKEN}
    TWITTER_ACCESS_TOKEN_SECRET: ${TWITTER_ACCESS_TOKEN_SECRET}
    `
  throw err
}

const T = new Twit({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
})

const tweet = message => {
  T.post('statuses/update', { status: message }, err => {
    if (err) { throw err }
  })
}

SpeedTest({ maxTime: 5000 }).on('data', data => {
  const download = data.speeds.download
  const upload = data.speeds.upload

  if ((download + BUFFER < DOWN_LIMIT) || (upload + BUFFER < UP_LIMIT)) {
    let message = `I pay ${ISP} for ${DOWN_LIMIT}Mbps down and ${UP_LIMIT}Mbps up, but my current speeds are ${download}Mbps down and ${upload}Mbps up!`
    logger('Tweeting this!')
    logger(message)
    tweet(message)
  } else if ((download < DOWN_LIMIT) || upload < UP_LIMIT) {
    logger('Speeds are slower than what you pay for, but not by enough to tweet.')
    logger(`${download}Mbps down and ${upload}Mbps up.`)
  } else {
    logger('Whoa. Your speeds are looking nice! 👌')
    logger(`${download}Mbps down and ${upload}Mbps up!`)
  }
})

