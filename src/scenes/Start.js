import Phaser from 'phaser'
import CONFIG from '../config.js'
import HoverableButton from '../models/HoverableButton.js'
import Slider from '../models/Slider.js'

class StartScene extends Phaser.Scene {
  init (data) {
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Loading...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    )
    this.loadingText.setOrigin(0.5, 0.5)

    this.isTutCompleted = data.tut
  }

  preload () {
    // Load the image assets needed for THIS scene
    // this.load.image('StartScreen', 'assets/Menus/Main/Picture_Perfect_Main_Menu_Claire.png')
    this.load.image('startScreen_1', 'assets/UI/UI_Main_Menu_Backround_Claire_4_9_2025_v4.png')
    this.load.image('startScreen_2', 'assets/UI/Main_Menu_Frame_Claire_4_17_2025_v1.png')
    this.load.image('startScreen_3', 'assets/UI/UI_Title_Claire_4_16_2025_v2.png')

    this.load.image('StartButton', 'assets/UI/UI_Main_Menu_Play_Claire_4_16_2025_v2.png')
    this.load.image('OptionsButton', 'assets/UI/UI_Main_Menu_Options_Claire_4_16_2025_v2.png')
    this.load.image('CreditsButton', 'assets/UI/UI_Main_Menu_Credits_Claire_4_16_2025_v2.png')

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
    // this.load.audioSprite('gameAudio', 'assets/audio/gameAudioSprite.json', [
    //   'assets/audio/gameAudioSprite.ogg',
    //   'assets/audio/gameAudioSprite.m4a',
    //   'assets/audio/gameAudioSprite.mp3',
    //   'assets/audio/gameAudioSprite.ac3'
    // ])
    this.load.audioSprite('bgMusic', 'assets/audio/bgMusic.json', [
      'assets/audio/MUS_GameTheme1_PP_demo1.wav'
    ])

    // load options menu assets
    this.load.image('optionsButton', 'assets/UI/UI_Options_Claire_4_9_2025_v1.png')
    this.load.image('optionsBackground', 'assets/UI/UI_Options_Menu_Backround_Claire_4_18_2025_v3.png')
    this.load.image('optionsSliderBar', 'assets/UI/UI_Options_Menu_Bar_Off_Claire_4_9_2025_v1.png')
    this.load.image('optionsSliderFill', 'assets/UI/UI_Options_Menu_Bar_On_Claire_4_9_2025_v1.png')
    this.load.image('optionsSliderHandle', 'assets/UI/UI_Options_Menu_Slider_Claire_4_9_2025_v1.png')
    this.load.image('optionsCloseButton', 'assets/UI/UI_Options_Menu_X_Claire_4_16_2025_v2.png')
    this.load.image('optionsMusicLabel', 'assets/UI/UI_Options_Music_Claire_4_16_2025_v2.png')
    this.load.image('optionsSoundLabel', 'assets/UI/UI_Options_Sound_Claire_4_16_2025_v2.png')

    // load json
    this.load.json('levelData', 'assets/Levels/Levels.json')
  }

  create () {
    // Remove loading text
    this.loadingText.destroy()

    // create json object on this
    this.data = this.cache.json.get('levelData')

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

    // Add background image 2
    const startScreen_2 = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'startScreen_2')
    startScreen_2.setScale(
      // rescales the image to aspect ratio of the game
      CONFIG.DEFAULT_WIDTH / startScreen_2.width,
      CONFIG.DEFAULT_HEIGHT / startScreen_2.height
    )

    // Add background image 3
    const startScreen_3 = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.7, 'startScreen_3')
    startScreen_3.setScale(0.8)

    // start button
    this.startButton = new HoverableButton(
      this, 
      CONFIG.DEFAULT_WIDTH / 2.0,
      CONFIG.DEFAULT_HEIGHT / 1.65,
      'StartButton',
      () => { this.toLevelSelect() }
    ).setInteractive()

    // options button
    this.optionsButton = new HoverableButton(
      this,
      CONFIG.DEFAULT_WIDTH / 2.0,
      CONFIG.DEFAULT_HEIGHT / 1.4,
      'OptionsButton',
      () => { this.toOptions() }
    ).setInteractive()

    // credits button
    this.creditsButton = new HoverableButton(
      this,
      CONFIG.DEFAULT_WIDTH / 2.0,
      CONFIG.DEFAULT_HEIGHT / 1.23,
      'CreditsButton',
      () => { this.toCredits() }
    ).setInteractive()

    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)

    // Load and play background music
    this.music = this.sound.addAudioSprite('bgMusic')

    // create options menu
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
      () => { this.music.volume = this.optionsMusicSlider.value / 100 }
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
    this.setOptionsDepth(10)
  }

  setOptionsDepth (depth) {
    this.optionsBackground.setDepth(depth)
    this.optionsCloseButton.setDepth(depth)
    this.optionsMusicLabel.setDepth(depth)
    this.optionsMusicSlider.setDepth(depth)
    this.optionsSoundLabel.setDepth(depth)
    this.optionsSoundSlider.setDepth(depth)
  }

  setOptionsVisibility (isVisible) {
    this.optionsBackground.setActive(isVisible).setVisible(isVisible)
    this.optionsCloseButton.setActive(isVisible).setVisible(isVisible)
    this.optionsMusicLabel.setActive(isVisible).setVisible(isVisible)
    this.optionsMusicSlider.setActive(isVisible).setVisible(isVisible)
    this.optionsSoundLabel.setActive(isVisible).setVisible(isVisible)
    this.optionsSoundSlider.setActive(isVisible).setVisible(isVisible)
  }

  // use this just to enter test scenes
  keyReleased (event) {
    console.log('Key released', event.code)
    if (event.code === 'KeyP') {
      this.scene.stop('StartScene')
      this.scene.start('JessieTestScene')
    } if (event.code == 'KeyA') {
      this.scene.start('BetaScene')
    } if (event.code == 'Space') {
      this.scene.start('PrototypeScene')
    }
    if (event.code === 'KeyG') {
      this.scene.stop('StartScene')
      // pass the json to init
      this.scene.start('GameScene', { levelData: this.data.levels[0] })
    }
    if (event.code === 'Digit1') {
      this.scene.stop('StartScene')
      this.scene.start('GameScene', { levelData: this.data.levels[0] })
    }
    if (event.code === 'Digit2') {
      this.scene.stop('StartScene')
      this.scene.start('GameScene', { levelData: this.data.levels[1] })
    }
    if (event.code === 'Digit3') {
      this.scene.stop('StartScene')
      this.scene.start('GameScene', { levelData: this.data.levels[2] })
    }
    // this.music.stop()
  }


  /**
   * Runs when pointerup event triggers on startButton.
   * Runs when Start Button is clicked.
   * Changes the scene to level select.
   */
  toLevelSelect () {
    console.log('toLevelSelect')
    this.scene.sleep('StartScene')
    // check if tutorial has been done
    if (this.isTutCompleted) {
      this.scene.start('LevelSelectScene', this.data)
    } else {
      if (this.data.numLevels > 0) {
        this.isTutCompleted = true
        this.scene.start('TutorialScene', { levelData: this.data.levels[0] })
      }
    }
  }

  /**
   * Runs when pointerup event triggers on optionsButton.
   * Runs when Options Button is clicked.
   * Changes the scene to options.
   */
  toOptions () {
    console.log('toOptions')
    this.setOptionsVisibility(true)
  }

  /**
   * Runs when pointerup event triggers on creditsButton.
   * Runs when Credits Button is clicked.
   * Changes the scene to credits. 
   */
  toCredits () {
    console.log('toCredits')
    //this.scene.sleep('StartScene')
    //this.scene.start('')
  }

}

export default StartScene
