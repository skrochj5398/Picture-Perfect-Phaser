import Phaser from 'phaser'
import CONFIG from '../config.js'

class WinScene extends Phaser.Scene {
  preload () {
    this.load.image('WinScreen', 'assets/WinScreen.png')
    this.load.spritesheet("WinScreenAnim", "assets/Animation/WinScreenAnim.png", {
      frameWidth: 1280,
      frameHeight: 720
    })
  }

  create () {
    this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'WinScreen')
    this.timeCheck = this.game.getTime()
    
    this.anims.create({
      key: "Curtains",
      frames: this.anims.generateFrameNumbers("WinScreenAnim", {frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]}),
      frameRate: 12,
      repeat: -1
    })

    this.Curtain = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, "WinScreenAnim")
    this.Curtain.setScale(1.2)
    this.Curtain.play("Curtains",true)
    // this.player = this.add.sprite(1000, 500, "Test anim")
    // this.player.setScale(1.2)
    // this.player.play("grass",true)

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
