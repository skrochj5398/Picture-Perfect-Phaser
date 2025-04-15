import Phaser from 'phaser'
import CONFIG from '../config.js'
import Slider from '../models/Slider.js'
import HoverableButton from '../models/HoverableButton.js'

class JessieTestScene extends Phaser.Scene {
  preload () {

  }

  create () {
    // create button to bring up menu
    this.optionsButton = new HoverableButton(this, 0, 0, 'optionsButton', () => { this.setOptionsVisibility(!this.optionsBackground.visible) })
    // set position
    this.optionsButton.setPosition(this.optionsButton.width / 2, this.optionsButton.height / 2)

    // create menu
    const labelToSliderOffset = 90
    const centerOfMenuX = CONFIG.DEFAULT_WIDTH / 2
    const centerOfMenuY = CONFIG.DEFAULT_HEIGHT / 2
    // create background
    this.optionsBackground = this.add.image(centerOfMenuX, centerOfMenuY, 'optionsBackground')
    // create close button
    this.optionsCloseButton = new HoverableButton(
      this,
      centerOfMenuX,
      centerOfMenuY + this.optionsBackground.height / 2 - 25,
      'optionsCloseButton',
      () => { this.setOptionsVisibility(!this.optionsBackground.visible) }
    )
    // create music label
    this.optionsMusicLabel = this.add.image(centerOfMenuX, centerOfMenuY - 150, 'optionsMusicLabel')
    // create music slider
    this.optionsMusicSlider = new Slider(
      this, centerOfMenuX,
      this.optionsMusicLabel.y + labelToSliderOffset,
      'optionsSliderHandle',
      'optionsSliderBar',
      this.textures.getFrame('optionsSliderBar').width,
      this.textures.getFrame('optionsSliderBar').height,
      'optionsSliderFill',
      0, 100,
      () => {}
    )
    // create sound label
    this.optionsSoundLabel = this.add.image(centerOfMenuX, centerOfMenuY + 60, 'optionsSoundLabel')
    // create sound slider
    this.optionsSoundSlider = new Slider(
      this, centerOfMenuX,
      this.optionsSoundLabel.y + labelToSliderOffset,
      'optionsSliderHandle',
      'optionsSliderBar',
      this.textures.getFrame('optionsSliderBar').width,
      this.textures.getFrame('optionsSliderBar').height,
      'optionsSliderFill',
      0, 100,
      () => {}
    )
    // make options menu invisible
    this.setOptionsVisibility(false)
  }

  setOptionsVisibility(isVisible) {
    this.optionsBackground.setActive(isVisible).setVisible(isVisible)
    this.optionsCloseButton.setActive(isVisible).setVisible(isVisible)
    this.optionsMusicLabel.setActive(isVisible).setVisible(isVisible)
    this.optionsMusicSlider.setActive(isVisible).setVisible(isVisible)
    this.optionsSoundLabel.setActive(isVisible).setVisible(isVisible)
    this.optionsSoundSlider.setActive(isVisible).setVisible(isVisible)
  }
}


export default JessieTestScene
