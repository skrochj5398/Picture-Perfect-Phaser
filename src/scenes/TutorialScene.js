import GameScene from '../scenes/GameScene.js'
import CONFIG from '../config.js'
import Phaser from 'phaser'

class TutorialScene extends GameScene {
  create () {
    this.tutorialProgress = 0
    // call GameScene.create
    super.create()
    // make tutorial layer over top
    // make painting darker
    const darkenTint = 0x888888
    this.currentPainting.img.setTint(darkenTint)
    // text constants
    this.textX = 400
    this.textY = 150
    // add text telling what to do
    this.tutorialText = this.add.text(
      this.textX, this.textY,
      'Find objects that are out of place in the paintings.\nClick them to send them to the inventory.',
      { font: '28pt Arial', color: '#FFFFFF', align: 'left' }
    )
    // disable swapping paintings
    this.setArrowsVisibility(false)
    // add a function to first sticker to reset tint and remove text
    this.currentPainting.stickers[0].image.on('pointerdown', () => { this.stepTutorial() })
  }

  stepTutorial () {
    this.tutorialProgress++
    if (this.tutorialProgress === 1) {
      this.currentPainting.img.setTint(0xffffff)
      // destroy old text
      this.tutorialText.destroy()
      // replace with new text
      this.tutorialText = this.add.text(
        this.textX, this.textY,
        'Use the arrows on the sides of the screen to swap paintings.\nWhen you find the silhouette of the object, drag it into place!',
        { font: '28pt Arial', color: '#FFFFFF', align: 'left' }
      )
      // make arrow buttons visible
      this.setArrowsVisibility(true)
      // add function to arrow buttons to call this.stepTutorial()
      this.arrowLeft.on('pointerup', () => { this.stepTutorial() })
      this.arrowRight.on('pointerup', () => { this.stepTutorial() })
    }
    if (this.tutorialProgress === 2) {
      // destroy old text
      this.tutorialText.destroy()
    }
    else {
      // nothing to do
    }
  }

  setArrowsVisibility (isVisible) {
    this.arrowLeft.setActive(isVisible).setVisible(isVisible)
    this.arrowRight.setActive(isVisible).setVisible(isVisible)
  }

  update () {
    if (this.transition != null && this.transition.anims.currentFrame.index === 22) {
      this.music.stop()
      // stop current scene
      this.game.scene.stop('TutorialScene')
      if (this.numStickersLeft === 0) {
        // go to win scene
        console.log('you win!')
        // start win scene
        this.game.scene.start('WinScene', { levelId: this.levelData.name })
      } else {
        // start level select scene
        this.game.scene.start('LevelSelectScene')
      }
      console.log('started next scene')
    }
  }
}

export default TutorialScene
