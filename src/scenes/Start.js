import Phaser from 'phaser'
import { CONFIG, OPTIONS_MENU } from '../config.js'
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

    // mark tutorial complete or not
    this.isTutCompleted = data.tut

    // get music
    this.music = data.music
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

    // load back button
    this.load.image('ReturnButton', '/assets/UI/UI_Return_Claire_4_16_2025_v2.png')

    // Load the image assets needed for 'ExampleScene'
    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
    this.load.spritesheet("Test anim", "assets/Animation/Spritesheet.png", {
      frameWidth: 1920,
      frameHeight: 1080
    })

    // load spritesheet for animation
    this.load.spritesheet('CurtainsTransition', 'assets/Animation/WinScreenAnim.png', {
      frameWidth: 1280,
      frameHeight: 720
    })
    // load winScene background
    this.load.image('WinScreen', 'assets/WinScreen.png')
    // load replay button
    this.load.image('ReplayButton', 'assets/UI/UI_Replay_Claire_4_16_2025_v2.png')

    // load music
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

    this.anims.create({
      key: 'Curtains',
      frames: this.anims.generateFrameNumbers('CurtainsTransition', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] }),
      frameRate: 12,
      repeat: 0
    })

    // create json object on this
    this.data = this.cache.json.get('levelData')

    // check if music exists
    if (this.music == null) {
      // make new music
      this.music = this.sound.addAudioSprite('bgMusic')
      this.music.play('MenuMusic1', { volume: CONFIG.musicVol })
    }

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
    // this.music = this.sound.addAudioSprite('bgMusic')
    // this.music.play('MenuMusic1', { volume: 0.5 })

    // create options menu
    // create background
    this.optionsBackground = this.add.image(OPTIONS_MENU.X, OPTIONS_MENU.Y, 'optionsBackground')
    // create close button
    this.optionsCloseButton = new HoverableButton(
      this,
      OPTIONS_MENU.X,
      OPTIONS_MENU.Y + this.optionsBackground.height / 2 - 25,
      'optionsCloseButton',
      () => { this.setOptionsVisibility(!this.optionsBackground.visible) }
    )
    // create music label
    this.optionsMusicLabel = this.add.image(OPTIONS_MENU.X, OPTIONS_MENU.Y - 150, 'optionsMusicLabel')
    // create music slider
    this.optionsMusicSlider = new Slider(
      this, OPTIONS_MENU.X,
      this.optionsMusicLabel.y + OPTIONS_MENU.LABEL_SLIDER_OFFSET,
      'optionsSliderHandle',
      'optionsSliderBar',
      this.textures.getFrame('optionsSliderBar').width,
      this.textures.getFrame('optionsSliderBar').height,
      'optionsSliderFill',
      0, 100,
      () => {
        CONFIG.musicVol = this.optionsMusicSlider.value / 100
        this.music.volume = CONFIG.musicVol
      },
      CONFIG.musicVol
    )
    // create sound label
    this.optionsSoundLabel = this.add.image(OPTIONS_MENU.X, OPTIONS_MENU.Y + 60, 'optionsSoundLabel')
    // create sound slider
    this.optionsSoundSlider = new Slider(
      this, OPTIONS_MENU.X,
      this.optionsSoundLabel.y + OPTIONS_MENU.LABEL_SLIDER_OFFSET,
      'optionsSliderHandle',
      'optionsSliderBar',
      this.textures.getFrame('optionsSliderBar').width,
      this.textures.getFrame('optionsSliderBar').height,
      'optionsSliderFill',
      0, 100,
      () => {
        CONFIG.sfxVol = this.optionsSoundSlider.value / 100
        this.sfx.volume = CONFIG.sfxVol
      },
      CONFIG.sfxVol
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
    if (event.code === 'Digit0') {
      this.music.stop()
    }
  }

  /**
   * Runs when pointerup event triggers on startButton.
   * Runs when Start Button is clicked.
   * Changes the scene to level select.
   */
  toLevelSelect () {
    console.log('toLevelSelect')
    // music keeps playing until entering a level
    // stop scene so assets clear
    //this.scene.stop('StartScene')
    // check if tutorial has been done
    if (this.isTutCompleted) {
      console.log('tutorial complete')
      // tutorial complete
      this.scene.start('LevelSelectScene', { json: this.data, music: this.music })
    } else {
      console.log('tutorial not complete')
      // tutorial not complete. check if a level exists (just to be safe)
      if (this.data.numLevels > 0) {
        // start transition
        this.startTransition('TutorialScene', { levelData: this.data.levels[0], music: this.music })
      }
    }
  }

  startTransition (transitionTarget, transitionData) {
    // make new transition   :'(
    this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
    this.transition.setScale(1.5).setDepth(1000)
    // play transition open
    this.transition.play({ key: 'Curtains', startFrame: 0 }, true)
    // save target scene
    this.targetScene = transitionTarget
    this.transitionData = transitionData
  }

  update () {
    // console.log(this.transition)
    if (this.transition != null && this.transition.anims != null && this.transition.anims.currentFrame.index === 22) {
      console.log('transition done')
      // stop music when entering tutorial
      this.music.stop()
      // set tutorial as completed
      this.isTutCompleted = true
      // stop this scene to remove assets
      this.game.scene.stop('StartScene')
      // start game scene, passing json for level
      this.game.scene.start(this.targetScene, this.transitionData)
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
    //this.scene.stop('StartScene')
    //this.scene.start('')
  }

}

export default StartScene
