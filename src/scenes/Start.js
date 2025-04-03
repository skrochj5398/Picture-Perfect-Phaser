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
    //this.load.image('StartScreen', 'assets/Menus/Main/Picture_Perfect_Main_Menu_Claire.png')
    this.load.image('startScreen_1', 'assets/Main_Menu_Backround_Claire_4_2_2025_v1.png')
    this.load.image('startScreen_2')

    this.load.image('StartButton', 'assets/UI_Play_Button_Claire_3_31_2025_v1.png')
    this.load.image('OptionsButton', 'assets/UI_Options_Button_Claire_3_31_2025_v1.png')

    this.load.image('RedBox', 'assets/RedBox.png')
    this.load.image('BlueBox', 'assets/BlueBox.png')

    // Load the image assets needed for 'ExampleScene'
    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
    this.load.spritesheet("Test anim", "assets/Animation/Spritesheet.png", {
      frameWidth: 1920,
      frameHeight: 1080
    })

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
    const startScreen_1 = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'startScreen_1')
    startScreen_1.setScale(
      // rescales the image to aspect ratio of the game
      CONFIG.DEFAULT_WIDTH / startScreen_1.width,
      CONFIG.DEFAULT_HEIGHT / startScreen_1.height
    )

    this.anims.create({
      key: "grass",
      frames: this.anims.generateFrameNumbers("Test anim", {frames:[0,1,2,3,4,5,6,7]}),
      frameRate: 8,
      repeat: -1
  })

    this.player = this.add.sprite(1000, 500, "Test anim")
    this.player.setScale(1.2)
    this.player.play("grass",true)


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


    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)

    // Load and play background music
    this.music = this.sound.addAudioSprite('gameAudio')
    this.music.play('freeVertexStudioTrack1')
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
   * Runs when pointerup event triggers on startButton.
   * Runs when Start Button is clicked.
   * Changes the scene to level select.
   */
  toLevelSelect () {
    console.log('toLevelSelect')
    this.scene.start('BetaScene')
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
