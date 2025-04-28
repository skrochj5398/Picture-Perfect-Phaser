import Phaser from 'phaser'
import CONFIG from '../config.js'
import Painting from '../models/Painting.js'
import Silhouette from '../models/Silhouette.js'
import InventoryView from '../models/InventoryView.js'
import Inventory from '../models/Inventory.js'
import HoverableButton from '../models/HoverableButton.js'
import Slider from '../models/Slider.js'
import Sticker from '../models/Sticker.js'

class GameScene extends Phaser.Scene {
  // initialization setup; takes the part of the json data for selected level
  init (data) {
    // create loading text
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Loading...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    )
    this.loadingText.setOrigin(0.5, 0.5)

    // save json to scene
    this.levelData = data.levelData

    // get music
    this.music = data.music
    // check if music exists
    if (this.music == null) {
      // make new music
      this.music = this.sound.addAudioSprite('bgMusic')
      this.music.play('MenuMusic1', { volume: CONFIG.musicVol })
    }

    // change music played
    this.music.stop()
    //this.music.start('') TODO add gameplay bgMusic

    console.log('making new transition')
    // make new transition
    this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
    this.transition.setScale(1.5).setDepth(1000)
    // initialize currentAnim
    this.transition.play('Curtains', true)
    // set transition to be closed curtains
    this.transition = this.transition.anims.pause(this.transition.anims.currentAnim.frames[22])
  }

  preload () {
    // this is where to load images or in StartScene
    // temp images for left and right buttons
    this.load.image('ArrowLeft', 'assets/UI/UI_Arrow_Left_Claire_4_9_2025_v1.png')
    this.load.image('ArrowRight', 'assets/UI/UI_Arrow_Right_Claire_4_9_2025_v1.png')

    // Load in particle effects
    this.load.image('star', 'assets/UI/Particle_01_Claire_4_16_2025_v1.png')

    // json loading
    this.keys = this.loadPaintingsFromJson(this.levelData)

    // inventory & frame
    this.load.image('Inventory', 'assets/Picture_Perfect_Inventory_3Slot_S_Claire.png')
    this.load.image('InventorySlot', 'assets/InventorySlot.png')
    this.load.image('Frame', 'assets/Picture perfect- Frame.png')
    this.load.image('Frame2', 'assets/Picture perfect- Frame2.png')
    this.load.image('Frame3', 'assets/sprites/Picture perfect- Frame3.png')
  }

  create () {
    // destroy loading text
    this.loadingText.destroy()

    // pass silhouettes too, in an array of Silhouettes with ids concat(painting#, silhouette#)
    // define after Frame so frame doesn't block click events (must more blood be shed!?)
    // create an array to fill with Paintings
    this.paintings = []
    const targetSilhouettes = []
    const allSilhouettes = []
    // read values from this.levelData to know how many stickers/silhouettes to pass
    for (let i = 0; i < this.levelData.numPaintings; i++) {
      const painting = this.levelData.paintings[i]
      // fill an array with sticker keys
      const stickers = []
      for (let j = 0; j < painting.numStickers; j++) {
        stickers.push(painting.name + painting.stickers[j].name)
        targetSilhouettes.push(painting.stickers[j].silhouette)
      }
      // fill an array with silhouette keys
      const silhouettes = []
      for (let k = 0; k < painting.numSilhouettes; k++) {
        //const silhouette = new Silhouette(this.add.image(0, 0, ), null, i * 10 + k)
        silhouettes.push(painting.name + painting.silhouettes[k])
        //allSilhouettes.push(silhouette)
      }
      // pass them to the Painting constructor
      const paintingObj = new Painting(painting.name, stickers, silhouettes, this)
      paintingObj.img.on('pointerdown', ()=> {this.this.onPlayerClicked()})
      this.paintings.push(paintingObj)

      // Dragging the stickers
      for (const sticker of paintingObj.stickers) {
        sticker.image.on('drag', (pointer, dragX, dragY) => {
          sticker.image.off('pointerdown')
          sticker.image.setPosition(dragX, dragY)
        })
      }
      // Making sure the correct Sticker goes to the correct Silhouette
      for (const sticker of paintingObj.stickers) {
        sticker.image.on('dragend', (pointer) => {
          if (sticker.image.x >= sticker.silhouette.x + sticker.silhouette.offset.x - (sticker.silhouette.bounds.rightbound - sticker.silhouette.bounds.leftbound) / 2) {
            sticker.image.disableInteractive()
          }
        })
      }
    }
    // add all stickers to an array
    this.stickerList = []
    for (const painting of this.paintings) {
      for (const sticker of painting.stickers) {
        this.stickerList.push(sticker)
      }
    }
    // use targetSilhouettes to find the correct silhouette for each sticker
    for (let i = 0; i < this.levelData.paintings.length; i++) {
      const painting = this.levelData.paintings[i]
      for (let j = 0; j < painting.stickers.length; j++) {
        // get the sticker
        const sticker = painting.stickers[j]
        // get the silhouette
        let silhouette = null
        let silhouetteIndex = 0
        while (silhouette == null && silhouetteIndex < allSilhouettes.length) {
          const sil = allSilhouettes[silhouetteIndex]
          for (const loopPainting of this.levelData.paintings) {
            console.log('checking: ', loopPainting.name + sticker.silhouette, '\nagainst: ', sil.image.texture.key)
            if (loopPainting.name + sticker.silhouette === sil.image.texture.key) {
              console.log('found silhouette: ', sil.image.texture.key)
              silhouette = sil
              break
            }
          }
          silhouetteIndex++
        }
        // now find the sticker 0_0
        let stickerObj = null
        for (const loopSticker of this.stickerList) {
          if (loopSticker.image.texture.key === painting.name + sticker.name) {
            stickerObj = loopSticker
            break
          }
        }
        // set the sticker's silhouette to the correct one
        stickerObj.setSilhouette(silhouette)
        //console.log('sticker: ', stickerObj.image.texture.key, 'silhouette: ', silhouette.image.texture.key)
      }
    }

    // nineslice the frame so it can be adjusted to fit painting
    this.paintingFrame = this.add.nineslice(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Frame3', 0, 1920, 1080,
      81, 81, 81, 81
    )

    // add inventory visual. TODO swap with real inventory
    const realInventory = new Inventory()

    // Create and configure a particle emitter
    this.emitter = this.add.particles(0, 0, 'star', {
      speed: 500,
      lifespan: 1000,
      quantity: 20,
      frequency: 20,
      // gravityY: 3000,
      scale: { start: 0.3, end: 1 },
      blendMode: 'ADD',
      emitting: false
    })

    this.emitter.addEmitZone({
      type: 'edge',
      source: new Phaser.Geom.Circle(0, 0, 160)
    })

    /* this.tweens.add({
      targets: this.emitter,
      ease: 'linear',
      yoyo: true
    }) */

    // attach a function to a sticker; should attach all of them
    console.log('about to attach click function')
    for (const painting of this.paintings) {
      for (let i = 0; i < painting.stickers.length; i++) {
        console.log('attaching event to sticker ', i)
        painting.stickers[i].image.on('pointerdown', () => { this.onStickerPointerDown(i) })
        // add sticker to rating system
        painting.stickers[i].image.on('pointerdown', () => {this.onPlayerClicked()})
        realInventory.addSticker(painting.stickers[i])
      }
    }

    // create Inventory View
    this.inventoryView = new InventoryView('InventorySlot', 960, 1035, 125, realInventory)
    this.inventoryView.draw(this)

    // set first painting and position it
    this.updatePainting(0)

    // attach functions to move up or down the array
    this.arrowLeft = new HoverableButton(this, 0, 0, 'ArrowLeft', () => { this.lastPainting() })
    this.arrowLeft.setPosition(this.arrowLeft.displayWidth / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0)
    this.arrowRight = new HoverableButton(this, 0, 0, 'ArrowRight', () => { this.nextPainting() })
    this.arrowRight.setPosition(CONFIG.DEFAULT_WIDTH - this.arrowRight.displayWidth / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0)

    // assign stickersLeft = stickers for each painting
    this.numStickersLeft = this.numStickers
    this.numStickersLeftPerPainting = this.numStickersPerPainting

    // create button to return to level select
    const returnButton = new HoverableButton(this, 0, 0, 'ReturnButton', () => { this.startTransition() })
    returnButton.setPosition(returnButton.displayWidth / 2.0 + CONFIG.HUD_MARGIN, returnButton.displayHeight / 2.0 + CONFIG.HUD_MARGIN)

    // create button to bring up options menu
    this.optionsButton = new HoverableButton(this, 0, 0, 'optionsButton', () => { this.setOptionsVisibility(!this.optionsBackground.visible) })
    // set position
    this.optionsButton.setPosition(returnButton.x + returnButton.displayWidth / 2 + CONFIG.HUD_MARGIN * 2 + this.optionsButton.width / 2, this.optionsButton.height / 2 + CONFIG.HUD_MARGIN)

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
      () => {
        CONFIG.musicVol = this.optionsMusicSlider.value / 100
        this.music.volume = CONFIG.musicVol
      },
      CONFIG.musicVol
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
      () => {
        CONFIG.sfxVol = this.optionsSoundSlider.value / 100
        this.sfx.volume = CONFIG.sfxVol
      },
      CONFIG.sfxVol
    )
    // make options menu invisible
    this.setOptionsVisibility(false)
    this.setOptionsDepth(10)

    // entering transition
    // destroy transition so it doesn't stay on screen
    console.log('DESTROY transition')
    this.transition.destroy()
    // make new transition   :'(
    this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
    this.transition.setScale(1.5).setDepth(1000)
    // play transition close
    console.log('play transition')
    this.transition.play({ key: 'Curtains', startFrame: 23 }, true)
  }

  startTransition () {
    // create transition
    this.transition = this.add.sprite(CONFIG.DEFAULT_WIDTH / 2.0, CONFIG.DEFAULT_HEIGHT / 2.0, 'CurtainsTransition')
    this.transition.setScale(1.5).setDepth(1000)
    // play transition open
    console.log('play transition')
    this.transition.play({ key: 'Curtains', startFrame: 0 }, true)
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

  onStickerPointerDown (index) {
    // This is where the clicking for sticker is happening
    console.log('running click function')
    console.log('targetSilhouette: ', this.currentPainting.stickers[index].silhouette)
    this.inventoryView.drawNewSticker(this.currentPainting.stickers[index], this)
    this.emitter.emitParticleAt(this.currentPainting.stickers[index].gameOrigin.x, this.currentPainting.stickers[index].gameOrigin.y)
    console.log('particle emitted at: ', this.currentPainting.stickers[index].gameOrigin)
    // this.currentPainting.stickers[index].image.setPosition(-5000, 0)
    this.currentPainting.removeSticker(this.currentPainting.stickers[index])
    // decrement num stickers left
    this.numStickersLeft--
    console.log(this.numStickersLeft)
    // decrement num stickers left per painting
    this.numStickersLeftPerPainting[this.paintings.indexOf(this.currentPainting)]--
    console.log(this.numStickersLeftPerPainting)
    // check if any stickers are left
    if (this.numStickersLeft === 0) {
      this.startTransition()
    }
  }

  // Method for paintings and stickers to handle clicks for scoring
  onPlayerClicked(){
    CONFIG.timesClicked++;
    console.log('Click!');
  }
  update () {
    if (this.transition != null && this.transition.anims.currentFrame.index === 22) {
      this.music.stop()
      // stop current scene
      this.game.scene.stop('GameScene')
      if (this.numStickersLeft === 0) {
        // go to win scene
        console.log('you win!')
        // start win scene
        this.game.scene.start('WinScene', { music: this.music, levelId: this.levelData.name })
      } else {
        // start level select scene
        this.game.scene.start('LevelSelectScene', { music: this.music })
      }
      console.log('started next scene')
    }

  nextPainting () {
    // move the current painting offscreen
    this.currentPainting.setPosition(-3000, -3000)
    // get the next index of the paintings Array
    let nextIndex = this.paintings.indexOf(this.currentPainting) + 1
    // check if nextIndex is past the end
    if (nextIndex >= this.paintings.length) {
      // reset back to the start
      console.log('looping paintings')
      nextIndex = 0
    }

    this.updatePainting(nextIndex)
  }

  lastPainting () {
    // move the current painting offscreen
    this.currentPainting.setPosition(-3000, -3000)
    // get the last index of the paintings Array
    let lastIndex = this.paintings.indexOf(this.currentPainting) - 1
    // check if lastIndex is past the end
    if (lastIndex < 0) {
      // reset back to the end
      console.log('looping paintings backwards')
      lastIndex = this.paintings.length - 1
    }

    this.updatePainting(lastIndex)
  }

  updatePainting (newIndex) {
    // change current painting to that one
    // change this.currentPainting
    this.currentPainting = this.paintings[newIndex]

    // change new paintings position to center of screen TODO update when frames are fixed
    this.currentPainting.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2)
    const width = this.currentPainting.getWidth()
    this.paintingFrame.width = width + 160
  }

  loadPaintingsFromJson (levelData) {
    const paintingKeys = []
    const stickerKeys = []
    // add name to path
    const path = 'assets/Levels/' + levelData.name + '/'
    // get number of paintings in level
    const numPaintings = levelData.numPaintings
    // create numStickers on this
    this.numStickers = 0
    // array to hold num for each painting; will be loaded as paintings are
    this.numStickersPerPainting = []
    // loop through them
    for (let i = 0; i < numPaintings; i++) {
      // get thisPainting
      const thisPainting = levelData.paintings[i]
      // add a zero to numStickersPerPainting
      this.numStickersPerPainting.push(0)
      // load the painting
      console.log('loading painting: ' + thisPainting.name)
      const paintingKey = thisPainting.name
      const paintingPath = path + 'Painting' + (i + 1) + '/'
      this.load.image(paintingKey, paintingPath + thisPainting.name)
      paintingKeys.push(paintingKey)
      // get number of stickers
      console.log('numStickers: ' + thisPainting.numStickers)
      const numStickers = thisPainting.numStickers
      // loop and load
      for (let j = 0; j < numStickers; j++) {
        const stickerName = thisPainting.stickers[j].name
        // load
        const stickerKey = paintingKey + stickerName
        const stickerPath = paintingPath + stickerName
        console.log('loading sticker: ' + stickerPath)
        this.load.image(stickerKey, stickerPath)
        stickerKeys.push(stickerKey)
        // increment number of stickers in level
        this.numStickers++
        // increment number of stickers in painting
        this.numStickersPerPainting[i]++
      }
      // get number of silhouettes
      const numSilhouettes = thisPainting.numSilhouettes
      // loop and load
      for (let k = 0; k < numSilhouettes; k++) {
        const silhouetteName = thisPainting.silhouettes[k]
        // load
        const silhouetteKey = paintingKey + silhouetteName
        const silhouettePath = paintingPath + silhouetteName
        console.log('loading silhouette: ' + silhouettePath)
        this.load.image(silhouetteKey, silhouettePath)
      }
    }
  }

  removePaintingTextures (levelData) {
    // get number of paintings in level
    const numPaintings = levelData.numPaintings
    // loop through them
    for (let i = 0; i < numPaintings; i++) {
      console.log('looping through painting ' + (i + 1) + '...')
      // get thisPainting
      const thisPainting = levelData.paintings[i]
      // remove
      console.log('Painting' + (i + 1))
      this.textures.remove('Painting' + (i + 1))
      // get number of stickers
      console.log('numStickers: ' + thisPainting.numStickers)
      const numStickers = thisPainting.numStickers
      // loop and remove
      for (let j = 0; j < numStickers; j++) {
        console.log('Painting' + (i + 1) + 'Sticker' + (j + 1))
        this.textures.remove('Painting' + (i + 1) + 'Sticker' + (j + 1))
      }
      // get number of silhouettes
      console.log('numSilhouettes: ' + thisPainting.numSilhouettes)
      const numSilhouettes = thisPainting.numSilhouettes
      // loop and remove
      for (let k = 0; k < numSilhouettes; k++) {
        console.log('Painting' + (i + 1) + 'Silhouette' + (k + 1))
        this.textures.remove('Painting' + (i + 1) + 'Silhouette' + (k + 1))
      }
    }
  }
}

export default GameScene
