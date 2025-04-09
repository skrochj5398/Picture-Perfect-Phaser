import Phaser from 'phaser'
import CONFIG from '../config.js'

class LevelSelectScene extends Phaser.Scene {
  preload () {
    // load swap buttons
    this.load.image('ArrowLeftButton', 'assets/sprites/Arrow_Left.png')
    this.load.image('ArrowRightButton', 'assets/sprites/Arrow_Right.png')
    // load level buttons
    this.load.image('RedBox', 'assets/RedBox.png')
    // load back button
    this.load.image('ReturnButton', '/assets/UI_Options_Menu_X_Claire_4_8_2025_v1.png')
    // load background image TODO
  }

  create () {
    // add stationary UI objects
    const leftButton = this.add.image(0, 0, 'ArrowLeftButton').setInteractive().setScale(0.5)
    leftButton.setPosition(leftButton.width / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0)
  }
}

export default LevelSelectScene
