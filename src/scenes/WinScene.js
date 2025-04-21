import Phaser from 'phaser'
import CONFIG from '../config.js'

class WinScene extends Phaser.Scene {
  init (data) {
    // get music
    this.music = data.music
    // check if music exists
    if (this.music == null) {
      // make new music
      this.music = this.sound.addAudioSprite('bgMusic')
    }
    this.music.play('MenuMusic1', { volume: CONFIG.musicVol })
  }

  preload () {
    this.load.image('WinScreen', 'assets/WinScreen.png')
    this.load.spritesheet('WinScreenAnim', 'assets/Animation/WinScreenAnim.png', {
      frameWidth: 1280,
      frameHeight: 720
    })
    // get json to pass to levelSelect
    this.data = this.cache.json.get('levelData')
  }

  create () {
    this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'WinScreen')
    this.timeCheck = this.game.getTime()
    this.anims.create({
      key: 'Curtains',
      frames: this.anims.generateFrameNumbers('WinScreenAnim', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] }),
      frameRate: 12,
      repeat: 0
    })

    this.Curtain = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'WinScreenAnim')
    this.Curtain.setScale(1.5)
    this.Curtain.play('Curtains', true)
  }

  return () {
    // stop this scene
    this.game.scene.stop('WinScene')
    // start level select scene
    this.game.scene.start('LevelSelectScene', { json: this.data, music: this.music })
  }
}

export default WinScene
