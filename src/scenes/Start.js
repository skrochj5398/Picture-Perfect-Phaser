import Phaser from 'phaser'
import CONFIG from '../config.js'

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
    this.load.image('StartScreen', 'assets/Menus/Main/Picture_Perfect_Main_Menu_Claire.png')
    // temp button textures
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
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
    const startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'StartScreen')
    startScreen.setScale(
      // rescales the image to aspect ratio of the game
      CONFIG.DEFAULT_WIDTH / startScreen.width,
      CONFIG.DEFAULT_HEIGHT / startScreen.height
    )

    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)

    // Create buttons to load textures into
    this.startButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 1.7, 
      'BlueBox').setScale(1, 0.5).setInteractive()
    this.optionsButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 1.4, 
      'BlueBox').setScale(1, 0.4).setInteractive()
    this.creditsButton = this.add.image(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 1.2, 
      'BlueBox').setScale(1, 0.4).setInteractive()
    
    // assign functions to all buttons
    this.startButton.on('pointerup', () => {this.toLevelSelect()})
    this.optionsButton.on('pointerup', () => {this.toOptions()})
    this.creditsButton.on('pointerup', () => {this.toCredits()})

    // assign functions to update texture for hovering
    this.startButton.on('pointermove', () => {this.hoverButton(this.startButton)})
    this.startButton.on('pointerout', () => {this.unHoverButton(this.startButton)})
    this.optionsButton.on('pointermove', () => {this.hoverButton(this.optionsButton)})
    this.optionsButton.on('pointerout', () => {this.unHoverButton(this.optionsButton)})
    this.creditsButton.on('pointermove', () => {this.hoverButton(this.creditsButton)})
    this.creditsButton.on('pointerout', () => {this.unHoverButton(this.creditsButton)})

    // Load and play background music
    // this.music = this.sound.addAudioSprite('gameAudio')
    // this.music.play('freeVertexStudioTrack1')

    this.anims.create({
      key: "grass",
      frames: this.anims.generateFrameNumbers("Test anim", {frames:[0,1,2,3,4,5,6,7]}),
      frameRate: 8,
      repeat: -1
  })

    this.player = this.add.sprite(1000, 500, "Test anim")
    this.player.setScale(1.2)
    this.player.play("grass",true)
  }

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
