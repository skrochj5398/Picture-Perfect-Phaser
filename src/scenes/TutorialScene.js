import GameScene from '../scenes/GameScene.js'
import CONFIG from '../config.js'
import Phaser from 'phaser'

class TutorialScene extends GameScene {
  create () {
    // call GameScene.create
    super.create()
    // make tutorial layer over top
    // make painting darker
    const darkenTint = 0x888888
    this.currentPainting.img.setTint(darkenTint)
    // add text telling what to do
    this.tutorialText = this.add.text(
      450, 150,
      'Find objects that are out of place in the paintings.\nClick them to send them to the inventory.\nOnce you find them all, you beat the level!',
      { font: '28pt Arial', color: '#FFFFFF', align: 'left' }
    )
    // disable swapping paintings
    this.setArrowsVisibility(false)
    // add a function to first sticker to reset tint and remove text
    this.currentPainting.stickers[0].image.on('pointerdown', () => { this.endTutorial() })
  }

  endTutorial () {
    this.currentPainting.img.setTint(0xffffff)
    this.tutorialText.destroy()
    this.setArrowsVisibility(true)
  }

  setArrowsVisibility (isVisible) {
    this.arrowLeft.setActive(isVisible).setVisible(isVisible)
    this.arrowRight.setActive(isVisible).setVisible(isVisible)
  }

  win () {
    console.log('you win!')
    // stop current scene
    this.game.scene.stop('TutorialScene')
    // fix textures persisting
    this.removePaintingTextures(this.levelData)
    console.log('removed assets')
    // start win scene
    this.game.scene.start('WinScene')
    console.log('started next scene')
  }
}

export default TutorialScene
