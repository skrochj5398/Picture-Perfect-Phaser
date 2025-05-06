import Phaser from 'phaser'
import CONFIG from '../config.js'
import HoverableButton from '../models/HoverableButton.js'

class WinScene extends Phaser.Scene {
  init (data) {
    // make music
    this.music = this.sound.addAudioSprite('bgMusic')
    this.music.play('MenuMusic1', { volume: CONFIG.musicVol })

    console.log('making new transition')
    // make new transition
    this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
    this.transition.setScale(1.5).setDepth(1000)
    // initialize currentAnim
    this.transition.play('Curtains', true)
    // set transition to be closed curtains
    this.transition = this.transition.anims.pause(this.transition.anims.currentAnim.frames[22])

    // collect level completed
    this.levelCompleted = data.levelId
  }

  preload () {
    // get json to pass to levelSelect
    this.data = this.cache.json.get('levelData')
  }

  create () {
    this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'WinScreen')

    // get levelIndex
    for (const level of this.data.levels) {
      if (level.name === this.levelCompleted) {
        this.levelIndex = this.data.levels.indexOf(level)
        console.log('found level index: ', this.data.levels.indexOf(level))
        break
      }
    }

    // create buttons
    const returnButton = new HoverableButton(this, 0, 0, 'WinReturnButton', () => { this.startTransition('LevelSelectScene', { json: this.data, music: this.music }) })
    const replayButton = new HoverableButton(this, 0, 0, 'WinReplayButton', () => { this.startTransition('GameScene', { levelData: this.data.levels[this.levelIndex] }) })

    const counterCenterOffset = 90
    // set initial button positions
    let returnButtonX = CONFIG.DEFAULT_WIDTH / 5 * 2 - counterCenterOffset
    let replayButtonX = CONFIG.DEFAULT_WIDTH / 5 * 3 + counterCenterOffset
    const buttonY = CONFIG.DEFAULT_HEIGHT / 4 * 3

    // check if continue button is needed
    if (this.data.levels[this.levelIndex + 1] != null) {
      const continueButton = new HoverableButton(this, 0, 0, 'WinContinueButton', () => { this.startTransition('GameScene', { levelData: this.data.levels[this.levelIndex + 1] }) })
      const centerOffset = 70
      // update button positions
      returnButtonX = CONFIG.DEFAULT_WIDTH / 6 * 1 + centerOffset
      replayButtonX = CONFIG.DEFAULT_WIDTH / 6 * 3
      const continueButtonX = CONFIG.DEFAULT_WIDTH / 6 * 5 - centerOffset
      continueButton.setPosition(continueButtonX, buttonY).setScale(0.9)
      returnButton.setScale(0.9)
      replayButton.setScale(0.9)
    }
    returnButton.setPosition(returnButtonX, buttonY)
    replayButton.setPosition(replayButtonX, buttonY)

    // destroy transition so it doesn't stay on screen
    console.log('DESTROY transition')
    this.transition.destroy()
    // make new transition   :'(
    this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
    this.transition.setScale(1.5).setDepth(1000)
    // play transition close
    console.log('play transition')
    this.transition.play({ key: 'Curtains', startFrame: 23 }, true)
  }

  startTransition (targetScene, data = {}) {
    // play transition open
    this.transition.play({ key: 'Curtains', startFrame: 0 }, true)
    // save target scene
    this.targetScene = targetScene
    this.transitionData = data
  }

  update () {
    // check if transition is done
    if (this.transition.anims.currentFrame.index === 22) {
      // go to target scene
      // stop music if playing another level
      if (this.targetScene === 'GameScene') {
        this.music.stop()
      }
      // stop this scene
      this.game.scene.stop('WinScene')
      // start level select scene
      this.game.scene.start(this.targetScene, this.transitionData)
    }
  }
}

export default WinScene
