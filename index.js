require('dotenv').config();

const logger = console.log
const SpeedTest = require('speedtest-net')

const DOWN_LIMIT = parseFloat(process.env.DOWN_LIMIT)
const UP_LIMIT = parseFloat(process.env.UP_LIMIT)
const BUFFER = parseFloat(process.env.BUFFER)
const ISP = process.env.ISP

if (DOWN_LIMIT && UP_LIMIT && BUFFER && ISP) {
  // crickets
} else {
  const err =
    `One or more required vars not set!
    DOWN_LIMIT: ${DOWN_LIMIT}
    UP_LIMIT: ${UP_LIMIT}
    BUFFER: ${BUFFER}
    ISP: ${ISP}
    `
  throw err
}

SpeedTest({ maxTime: 5000 }).on('data', data => {
  const download = data.speeds.download
  const upload = data.speeds.upload

  if ((download + BUFFER < DOWN_LIMIT) || (upload + BUFFER < UP_LIMIT)) {
    logger('Tweeting this!')
    logger(
      `I pay ${ISP} for ${DOWN_LIMIT}Mbps down and ${UP_LIMIT}Mbps up,`,
      `but my current speeds are ${download}Mbps down and ${upload}Mbps up!`
    )
  } else if ((download < DOWN_LIMIT) || upload < UP_LIMIT) {
    logger('Speeds are slower than what you pay for, but not by enough to tweet.')
    logger(`${download}Mbps down and ${upload}Mbps up.`)
  } else {
    logger('Whoa. Your speeds are looking nice! 👌')
    logger(`${download}Mbps down and ${upload}Mbps up!`)
  }
})

