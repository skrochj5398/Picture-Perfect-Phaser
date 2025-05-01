import Phaser from 'phaser'
import CONFIG from '../config.js'
import HoverableButton from '../models/HoverableButton.js'

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

    // get levelIndex
    for (const level of this.data.levels) {
      if (level.name === this.levelCompleted) {
        this.levelIndex = this.data.levels.indexOf(level)
        console.log('found level index: ', this.data.levels.indexOf(level))
        break
      }
    }

    // Adding image based on user score
    if (CONFIG.timesClicked <= this.data.levels[this.levelIndex].GoldRating){
      this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'WinScreen')
      console.log('Boo')
    }
    else if (CONFIG.timesClicked <= this.data.levels[this.levelIndex].SilverRating){
      this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'TempWinScreen')
    }
    else {
      this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'RedBox')
    }
    //this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'WinScreen')

        // create return button
        const returnButtonX = CONFIG.DEFAULT_WIDTH / 5 * 2
        const returnButtonY = CONFIG.DEFAULT_HEIGHT / 4 * 3
        const returnButton = new HoverableButton(this, 0, 0, 'ReturnButton', () => { this.startTransition('LevelSelectScene', { json: this.data, music: this.music }) })
        returnButton.setPosition(returnButtonX, returnButtonY)
    
        // create return button
        const replayButtonX = CONFIG.DEFAULT_WIDTH / 5 * 3
        const replayButtonY = CONFIG.DEFAULT_HEIGHT / 4 * 3
        const replayButton = new HoverableButton(this, 0, 0, 'ReplayButton', () => { this.startTransition('GameScene', { levelData: this.data.levels[this.levelIndex], music: this.music }) })
        replayButton.setPosition(replayButtonX, replayButtonY)
    
        // destroy transition so it doesn't stay on screen
        console.log('DESTROY transition')
        this.transition.destroy()
        // make new transition   :'(
        this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
        this.transition.setScale(1.5).setDepth(1000)
        // play transition close
        console.log('play transition')
        this.transition.play({ key: 'Curtains', startFrame: 23 }, true)


    // TESTING PURPOSES ONLY: Printing times clicked and then resetting variable
    // console.log('Times Clicked: ' + CONFIG.timesClicked)
    // CONFIG.timesClicked = 0;
    //this.game.time.events.add(Phaser.Timer.SECOND * 2, this.announceScore, this);
    this.announceScore()
  }

  announceScore () {
    // TESTING PURPOSES ONLY: Printing times clicked and then resetting variable
    console.log('Times Clicked: ' + CONFIG.timesClicked)
    console.log('Gold Rating: ' + this.data.levels[this.levelIndex].GoldRating)
    CONFIG.timesClicked = 0;
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
      // stop this scene
      this.game.scene.stop('WinScene')
      // start level select scene
      this.game.scene.start(this.targetScene, this.transitionData)
    }
  }
}

export default WinScene
