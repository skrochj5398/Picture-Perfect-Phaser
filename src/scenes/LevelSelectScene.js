import Phaser from 'phaser'
import CONFIG from '../config.js'
import HoverableButton from '../models/HoverableButton.js'

class LevelSelectScene extends Phaser.Scene {
  init (data) {
    // get json
    this.data = this.cache.json.get('levelData')
    // get music
    this.music = data.music
    // check if music exists
    if (this.music == null) {
      console.log('making new music')
      // make new music
      this.music = this.sound.addAudioSprite('bgMusic')
      this.music.play('MenuMusic1', { volume: CONFIG.musicVol })
    } else {
      console.log('using existing music', this.music)
      if (!this.music.isPlaying && !this.music.play('MenuMusic1', { volume: CONFIG.musicVol })) {
        // music couldn't play on this object, so make a new one
        this.music.destroy()
        this.music = this.sound.addAudioSprite('bgMusic')
        this.music.play('MenuMusic1', { volume: CONFIG.musicVol })
      }
    }
    this.doTransition = data.doTransition
    if (!this.doTransition) {
      console.log('making new transition')
      // make new transition
      this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
      this.transition.setScale(1.5).setDepth(1000)
      // start transition end
      this.transition.play('Curtains', true)
      // set transition to be closed curtains
      this.transition = this.transition.anims.pause(this.transition.anims.currentAnim.frames[22])
    }
  }

  preload () {
    // load swap buttons
    this.load.image('ArrowLeftButton', 'assets/UI/UI_Arrow_Left_Claire_4_9_2025_v1.png')
    this.load.image('ArrowRightButton', 'assets/UI/UI_Arrow_Right_Claire_4_9_2025_v1.png')
    // load level buttons
    this.load.image('BlueBox', 'assets/BlueBox.png')
    // load background image
    this.load.image('Background', 'assets/Background_Claire_4_9_2025_v1.png')
  }

  create () {
    // create background
    const background = this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'Background')
    background.setScale(CONFIG.DEFAULT_WIDTH / background.width, CONFIG.DEFAULT_HEIGHT / background.height)
    // add stationary UI objects
    // left button
    const leftButton = new HoverableButton(this, 0, 0, 'ArrowLeftButton', () => { this.scrollLeft() })
    leftButton.setPosition(leftButton.displayWidth / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0)

    // right button
    const rightButton = new HoverableButton(this, 0, 0, 'ArrowRightButton', () => { this.scrollRight() })
    rightButton.setPosition(CONFIG.DEFAULT_WIDTH - rightButton.displayWidth / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0)

    // return button
    const returnButton = new HoverableButton(this, 0, 0, 'ReturnButton', () => { this.goBack() })
    returnButton.setPosition(returnButton.displayWidth / 2.0 + CONFIG.HUD_MARGIN, returnButton.displayHeight / 2.0 + CONFIG.HUD_MARGIN)

    // get number of levels from json
    const numLevels = this.data.numLevels
    console.log(this.data.numLevels)
    // create array to store buttons
    this.pages = []
    // loop through and add buttons
    for (let i = 0; i < numLevels; i++) {
      // variables
      const columns = 2
      const rows = 2
      // check in another page is needed
      if (i % (rows * columns) === 0) {
        this.pages.push([])
        console.log('pushing a new page: ', this.pages.length)
      }
      // current page
      const currentPage = Math.floor(i / (rows * columns))
      // where to add button
      const levelsPerPage = columns * rows
      const xOffset = CONFIG.DEFAULT_WIDTH / (columns + 1)
      const yOffset = CONFIG.DEFAULT_HEIGHT / (rows + 1)
      console.log('this page index: ', currentPage, ' this page: ', this.pages[currentPage])
      const pagePos = this.pages[currentPage].length % levelsPerPage
      const xPos = pagePos % columns + 1
      const yPos = Math.floor((pagePos % (rows * columns)) / 2) + 1
      console.log(xPos, ' ', yPos)
      const x = xOffset * xPos
      const y = yOffset * yPos
      // create a  button
      console.log('adding button')
      const button = new HoverableButton(this, x, y, 'BlueBox', () => {
        // stop music
        this.music.stop()
        // start transition
        this.startTransition('GameScene', { levelData: this.data.levels[i] })
      })
      const text = this.add.text(x - button.displayWidth / 2, y, this.data.levels[i].name,
        { font: '16pt Arial', color: '#FFFFFF', align: 'center' })
      const levelButton = { button: button, text: text }
      // add button to storage structure
      console.log('pushing button')
      this.pages[currentPage].push(levelButton)
      // check if levelButton is on another page
      console.log(i / (rows * columns))
      if (i / (rows * columns) >= 1) {
        // set not active
        this.changeLevelButtonStatus(levelButton, false)
      }
    }
    this.currentPage = 0
    // disable page turn buttons if only one page
    if (this.pages.length <= 1) {
      leftButton.setActive(false).setVisible(false)
      rightButton.setActive(false).setVisible(false)
    }

    this.input.keyboard.on('keyup', this.keyReleased, this)

    if (!this.doTransition) {
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
  }

  startTransition (transitionTarget, transitionData) {
    if (this.transition == null) {
      this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
      this.transition.setScale(1.5).setDepth(1000)
    }
    // play transition open
    this.transition.play({ key: 'Curtains', startFrame: 0 }, true)
    // save target scene
    this.targetScene = transitionTarget
    this.transitionData = transitionData
  }

  update () {
    if (this.transition != null && this.transition.anims != null && this.transition.anims.currentFrame.index === 22) {
      // stop this scene to remove assets
      this.game.scene.stop('LevelSelectScene')
      // start game scene, passing json for level
      this.game.scene.start(this.targetScene, this.transitionData)
    }
  }

  scrollLeft () {
    // move to previous page
    // remove current page
    for (let i = 0; i < this.pages[this.currentPage].length; i++) {
      const levelButton = this.pages[this.currentPage][i]
      this.changeLevelButtonStatus(levelButton, false)
    }
    // decrement current page
    this.currentPage--
    // check array bounds
    if (this.currentPage < 0) {
      // to far. wrap to end
      console.log('wrapping to end')
      this.currentPage = this.pages.length - 1
    }
    // enable new page
    for (let i = 0; i < this.pages[this.currentPage].length; i++) {
      const levelButton = this.pages[this.currentPage][i]
      this.changeLevelButtonStatus(levelButton, true)
    }
  }

  scrollRight () {
    // move to next page
    // remove current page
    for (let i = 0; i < this.pages[this.currentPage].length; i++) {
      const levelButton = this.pages[this.currentPage][i]
      this.changeLevelButtonStatus(levelButton, false)
    }
    // increment current page
    this.currentPage++
    // check array bounds
    if (this.currentPage >= this.pages.length) {
      // too far. return to 0
      console.log('wrapping to 0')
      this.currentPage = 0
    }
    // enable new page
    for (let i = 0; i < this.pages[this.currentPage].length; i++) {
      const levelButton = this.pages[this.currentPage][i]
      this.changeLevelButtonStatus(levelButton, true)
    }
    console.log(this.currentPage, ' ', this.pages.length)
  }

  changeLevelButtonStatus (levelButton, status) {
    console.log(levelButton)
    // set both active and invisible so they don't update and can't be clicked
    levelButton.button.setActive(status).setVisible(status)
    levelButton.text.setActive(status).setVisible(status)
    // debug log
    if (status) {
      console.log('set active')
    } else {
      console.log('set inactive')
    }
  }

  goBack () {
    this.game.scene.stop('LevelSelectScene')
    this.game.scene.start('StartScene', { music: this.music, tut: true })
  }

  keyReleased (event) {
    console.log('Key released', event.code)
    if (event.code === 'KeyP') {
      this.scene.stop('LevelSelectScene')
      this.scene.start('TutorialScene', { levelData: this.data.levels[0] })
    }
  }
}

export default LevelSelectScene
