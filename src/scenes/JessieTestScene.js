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
    // create background
    this.optionsBackground = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'optionsBackground')
    // create slider
    this.optionsSlider = new Slider(
      this, CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'optionsSliderHandle',
      'optionsSliderBar',
      this.textures.getFrame('optionsSliderBar').width,
      this.textures.getFrame('optionsSliderBar').height,
      'optionsSliderFill',
      0, 100
    )
    // make options menu invisible
    this.setOptionsVisibility(false)
  }

  setOptionsVisibility(isVisible) {
    this.optionsBackground.setActive(isVisible).setVisible(isVisible)
    this.optionsSlider.setActive(isVisible).setVisible(isVisible)
  }
}


export default JessieTestScene
