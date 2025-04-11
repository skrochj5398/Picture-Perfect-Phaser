import Phaser from 'phaser'
import CONFIG from '../config.js'
import Slider from '../models/Slider.js'

class JessieTestScene extends Phaser.Scene {
  preload () {
    // this is where to load images
    this.load.image('optionsBackground', 'assets/UI/UI_Options_Claire_4_9_2025_v1.png')
    this.load.image('optionsSliderBar', 'assets/UI/UI_Options_Menu_Bar_Off_Claire_4_9_2025_v1.png')
    this.load.image('optionsSliderFill', 'assets/UI/UI_Options_Menu_Bar_On_Claire_4_9_2025_v1.png')
    this.load.image('optionsSliderHandle', 'assets/UI/UI_Options_Menu_Slider_Claire_4_9_2025_v1.png')
  }

  create () {
    this.optionsSlider = new Slider(this, CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'optionsSliderHandle')
  }
}


export default JessieTestScene
