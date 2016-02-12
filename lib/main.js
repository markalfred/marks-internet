import SpeedTester from './speed-tester'

const logger = console.log

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

const tester = new SpeedTester({ downLimit: DOWN_LIMIT, upLimit: UP_LIMIT, buffer: BUFFER, isp: ISP })
tester.runTest()

module.exports = test
