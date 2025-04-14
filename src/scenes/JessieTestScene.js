import Phaser from 'phaser'
import CONFIG from '../config.js'
import Slider from '../models/Slider.js'
import HoverableButton from '../models/HoverableButton.js'

class JessieTestScene extends Phaser.Scene {
  preload () {
    // this is where to load images
    this.load.image('optionsButton', 'assets/UI/UI_Options_Claire_4_9_2025_v1.png')
    this.load.image('optionsBackground', '')
    this.load.image('optionsSliderBar', 'assets/UI/UI_Options_Menu_Bar_Off_Claire_4_9_2025_v1.png')
    this.load.image('optionsSliderFill', 'assets/UI/UI_Options_Menu_Bar_On_Claire_4_9_2025_v1.png')
    this.load.image('optionsSliderHandle', 'assets/UI/UI_Options_Menu_Slider_Claire_4_9_2025_v1.png')
  }

  create () {

    // create button to bring up menu
    this.optionsButton = new HoverableButton(this, 0, 0, 'optionsButton')

    // create slider
    /*this.optionsSlider = new Slider(
      this, CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'optionsSliderHandle',
      'optionsSliderBar',
      this.textures.getFrame('optionsSliderBar').width,
      this.textures.getFrame('optionsSliderBar').height,
      'optionsSliderFill',
      0, 100
    )*/
  }
}


export default JessieTestScene
