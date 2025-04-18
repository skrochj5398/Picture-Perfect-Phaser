import Phaser from 'phaser'
import CONFIG from '../config.js'
import HoverableButton from '../models/HoverableButton.js'

class LevelSelectScene extends Phaser.Scene {
  init (jsonData) {
    // get json
    this.data = jsonData
  }

  preload () {
    // load swap buttons
    this.load.image('ArrowLeftButton', 'assets/UI/UI_Arrow_Left_Claire_4_9_2025_v1.png')
    this.load.image('ArrowRightButton', 'assets/UI/UI_Arrow_Right_Claire_4_9_2025_v1.png')
    // load level buttons
    this.load.image('BlueBox', 'assets/BlueBox.png')
    // load back button
    this.load.image('ReturnButton', '/assets/UI_Options_Menu_X_Claire_4_8_2025_v1.png')
    // load background image TODO
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
    returnButton.setPosition(returnButton.displayWidth / 2.0, returnButton.displayHeight / 2.0)

    // get number of levels from json
    const numLevels = this.data.numLevels
    console.log(this.data.numLevels)
    // create array to store buttons
    this.pages = []
    // loop through and add buttons
    for (let i = 0; i < numLevels; i++) {
      // check in another page is needed
      if (i % 6 === 0) {
        this.pages.push([])
        console.log('pushing a new page: ', this.pages.length)
      }
      // variables
      const columns = 2
      const rows = 3
      // current page
      const currentPage = Math.floor(i / (rows * columns))
      // where to add button
      const levelsPerPage = columns * rows
      const xOffset = CONFIG.DEFAULT_WIDTH / (columns + 1)
      const yOffset = CONFIG.DEFAULT_HEIGHT / (rows + 1)
      const pagePos = this.pages[currentPage].length % levelsPerPage
      const xPos = pagePos % columns + 1
      const yPos = Math.floor((pagePos % (rows * columns)) / 2) + 1
      console.log(xPos, ' ', yPos)
      const x = xOffset * xPos
      const y = yOffset * yPos
      // create a  button
      console.log('adding button')
      const button = new HoverableButton(this, x, y, 'BlueBox', () => {
        this.game.scene.stop('LevelSelectScene')
        this.game.scene.start('GameScene', { levelData: this.data.levels[i] })
      })
      const text = this.add.text(x, y, this.data.levels[i].name,
        { font: '16pt Arial', color: '#FFFFFF', align: 'center' })
      const levelButton = { button: button, text: text }
      // add button to storage structure
      console.log('pushing button')
      this.pages[currentPage].push(levelButton)
      // check if levelButton is on another page
      console.log(i / 6)
      if (i / 6 >= 1) {
        // set not active
        this.changeLevelButtonStatus(levelButton, false)
      }
    }
    this.currentPage = 0

    this.input.keyboard.on('keyup', this.keyReleased, this)
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
    this.game.scene.start('StartScene')
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
