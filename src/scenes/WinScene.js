import Phaser from 'phaser'
import CONFIG from '../config.js'

class WinScene extends Phaser.Scene {
  preload () {
    this.load.image('WinScreen', 'assets/TempWinScreen.png')
  }

  create () {
    this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'WinScreen')
    this.timeCheck = this.game.getTime()
  }

  update () {
    // increment time?
    this.timeElapsed = this.game.getTime() - this.timeCheck
    console.log(this.timeElapsed)
    // check if enough time has passed
    if (this.timeElapsed >= 3000) {
      this.game.scene.stop('WinScene')
      this.game.scene.start('StartScene')
    }
  }
}

export default WinScene
