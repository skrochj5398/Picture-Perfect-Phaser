import Phaser from 'phaser'
import CONFIG from '../config.js'
import HoverableButton from '../models/HoverableButton.js'

class StartScene extends Phaser.Scene {
  init () {
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Loading...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    )
    this.loadingText.setOrigin(0.5, 0.5)
  }

  preload () {
    // Load the image assets needed for THIS scene
    this.load.image('StartScreen', 'assets/UI_Main_Menu_Background_Claire_3_31_2025_v1.png')
    // temp button textures
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
    // actual menu textures
    this.load.image('StartButton', 'assets/UI_Play_Button_Claire_3_31_2025_v1.png')
    this.load.image('OptionsButton', 'assets/UI_Options_Button_Claire_3_31_2025_v1.png')

    // Pre-load the entire audio sprite
    this.load.audioSprite('gameAudio', 'assets/audio/gameAudioSprite.json', [
      'assets/audio/gameAudioSprite.ogg',
      'assets/audio/gameAudioSprite.m4a',
      'assets/audio/gameAudioSprite.mp3',
      'assets/audio/gameAudioSprite.ac3'
    ])
  }

  create () {
    // Remove loading text
    this.loadingText.destroy()

    // Add background image
    const startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'StartScreen')
    startScreen.setScale(
      // rescales the image to aspect ratio of the game
      CONFIG.DEFAULT_WIDTH / startScreen.width,
      CONFIG.DEFAULT_HEIGHT / startScreen.height
    )

    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)

    // Create buttons to load textures into
    // start button
    this.startButton = new HoverableButton(
      this, 
      CONFIG.DEFAULT_WIDTH / 2.0, 
      CONFIG.DEFAULT_HEIGHT / 1.7, 
      'StartButton', 
      'StartButton', 
      () => {this.toLevelSelect()}
    ).setInteractive()

    // options button
    this.optionsButton = new HoverableButton(
      this, 
      CONFIG.DEFAULT_WIDTH / 2.0, 
      CONFIG.DEFAULT_HEIGHT / 1.4, 
      'OptionsButton', 
      'OptionsButton', 
      () => {this.toOptions()}
    ).setInteractive()
    
    // credits button
    this.creditsButton = new HoverableButton(
      this, 
      CONFIG.DEFAULT_WIDTH / 2.0, 
      CONFIG.DEFAULT_HEIGHT / 1.2, 
      'BlueBox', 
      'RedBox', 
      () => {this.toCredits()}
    ).setInteractive().setScale(1, 0.4)

    // Load and play background music
    // this.music = this.sound.addAudioSprite('gameAudio')
    // this.music.play('freeVertexStudioTrack1')
  }

  // use this just to enter test scenes
  keyReleased (event) {
    console.log('Key released', event.code)
    if (event.code == 'KeyP') {
      this.scene.start('JessieTestScene')
    } if (event.code == 'KeyA') {
      this.scene.start('AlphaScene')
    } if (event.code == 'Space') {
      this.scene.start('PrototypeScene')
    }
    
    //this.music.stop()
  }

  /**
   * changes button texture when hovered over
   * @param {Phaser.GameObjects.Image} image 
   */
  hoverButton (image) {
    image.setTexture('RedBox')
  }

  /**
   * changes button texture when no longer hovered over
   * @param {Phaser.GameObjects.Image} image 
   */
  unHoverButton (image) {
    image.setTexture('BlueBox')
  }

  /**
   * Runs when pointerup event triggers on startButton.
   * Runs when Start Button is clicked.
   * Changes the scene to level select.
   */
  toLevelSelect () {
    console.log('toLevelSelect')
    //this.scene.start('')

    //go to alpha for now
    this.scene.start('AlphaScene')
  }

  /**
   * Runs when pointerup event triggers on optionsButton.
   * Runs when Options Button is clicked.
   * Changes the scene to options.
   */
  toOptions () {
    console.log('toOptions')
    //this.scene.start('')
  }

  /**
   * Runs when pointerup event triggers on creditsButton.
   * Runs when Credits Button is clicked.
   * Changes the scene to credits. 
   */
  toCredits () {
    console.log('toCredits')
    //this.scene.start('')
  }
  
}

export default StartScene
