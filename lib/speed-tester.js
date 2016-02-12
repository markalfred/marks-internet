import SpeedTest from 'speedtest-net'

class SpeedTester {
  constructor ({ maxTime = 5000, logger = console.log, tweeter, downLimit, upLimit, buffer, isp }) {
    this.maxTime = maxTime
    this.logger = logger
    this.tweeter = tweeter
    this.downLimit = downLimit
    this.upLimit = upLimit
    this.buffer = buffer
    this.isp = isp
  }

  runTest () {
    this.test = SpeedTest(this.maxTime)
    this.test.on('data', data => {
      const { download, upload } = data.speeds
      this.handle({ download, upload })
    })
  }

  handle ({ download, upload }) {
    if ((download + this.buffer < this.downLimit) || (upload + this.buffer < this.upLimit)) {
      let message = `I pay ${this.isp} for ${this.downLimit}Mbps down and ${this.upLimit}Mbps up, but my current speeds are ${download}Mbps down and ${upload}Mbps up!`
      this.logger('Tweeting this!')
      this.logger(message)
      // this.tweeter.tweet(message)
    } else if ((download < this.downLimit) || upload < this.upLimit) {
      this.logger('Speeds are slower than what you pay for, but not by enough to tweet.')
      this.logger(`${download}Mbps down and ${upload}Mbps up.`)
    } else {
      this.logger('Whoa. Your speeds are looking nice! 👌')
      this.logger(`${download}Mbps down and ${upload}Mbps up!`)
    }
  }
}

export default SpeedTester
