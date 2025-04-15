import Phaser from 'phaser'
import CONFIG from '../config.js'
import Painting from '../models/Painting.js'
import Silhouette from '../models/Silhouette.js'
import InventoryView from '../models/InventoryView.js'
import Inventory from '../models/Inventory.js'

class GameScene extends Phaser.Scene {
  // initialization setup; takes the part of the json data for selected level
  init (jsonData) {
    // create loading text
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Loading...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    )
    this.loadingText.setOrigin(0.5, 0.5)

    // save json to scene
    this.levelData = jsonData.levelData
  }

  preload () {
    // this is where to load images or in StartScene
    // temp images for left and right buttons
    this.load.image('ArrowLeft', 'assets/sprites/Arrow_Left.png')
    this.load.image('ArrowRight', 'assets/sprites/Arrow_Right.png')

    // Load in particle effects
    this.load.image('red', 'assets/particles/red.png')

    // json loading
    this.loadPaintingsFromJson(this.levelData)

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
    // read values from this.levelData to know how many stickers/silhouettes to pass
    for (let i = 0; i < this.levelData.numPaintings; i++) {
      const painting = this.levelData.paintings[i]
      // fill an array with sticker keys
      const stickers = []
      for (let j = 0; j < painting.numStickers; j++) {
        stickers.push('Painting' + (i + 1) + 'Sticker' + (j + 1))
      }
      // fill an array with silhouette keys
      const silhouettes = []
      for (let k = 0; k < painting.numSilhouettes; k++) {
        silhouettes.push(new Silhouette(this.add.image(0, 0, 'Painting' + (i + 1) + 'Silhouette' + (k + 1)), null, i * 10 + k))
      }
      // pass them to the Painting constructor
      const paintingObj = new Painting('Painting' + (i + 1), stickers, silhouettes, this)
      this.paintings.push(paintingObj)
    }

    // nineslice the frame so it can be adjusted to fit painting
    this.paintingFrame = this.add.nineslice(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Frame3', 0, 1920, 1080,
      81, 81, 81, 81
    )

    // add inventory visual. TODO swap with real inventory
    //this.add.image(1000, 1010, 'Inventory').setScale(0.5)
    var realInventory = new Inventory();

    // Create and configure a particle emitter
    this.emitter = this.add.particles(0, 0, 'red', {
      speed: 100,
      lifespan: 1000,
      quantity: 20,
      frequency: 10,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      emitting: false
    })

    // attach a function to a sticker; should attach all of them
    console.log('about to attach click function')
    for (const painting of this.paintings) {
      for (let i = 0; i < painting.stickers.length; i++) {
        console.log('attaching event to sticker ', i)
        painting.stickers[i].image.on('pointerdown', () => { this.onStickerPointerDown(i) })
        realInventory.addSticker(painting.stickers[i])
      }
    }

    // create Inventory View
    this.inventoryView = new InventoryView('InventorySlot', 960, 1035, 125, realInventory)
    this.inventoryView.draw(this)

    // set first painting and position it
    this.updatePainting(0)

    // attach functions to move up or down the array
    this.arrowLeft = this.add.image(55, CONFIG.DEFAULT_HEIGHT / 2, 'ArrowLeft').setInteractive()
    this.arrowRight = this.add.image(CONFIG.DEFAULT_WIDTH - 55, CONFIG.DEFAULT_HEIGHT / 2, 'ArrowRight').setInteractive()
    this.arrowLeft.setScale(0.5)
    this.arrowRight.setScale(0.5)
    this.arrowLeft.on('pointerdown', () => { this.lastPainting() })
    this.arrowRight.on('pointerdown', () => { this.nextPainting() })

    // assign stickersLeft = stickers for each painting
    this.numStickersLeft = this.numStickers
    this.numStickersLeftPerPainting = this.numStickersPerPainting
  }

  onStickerPointerDown (index) {
    console.log('running click function')
    this.inventoryView.drawNewSticker(this.currentPainting.stickers[index], this)
    this.emitter.emitParticleAt(this.currentPainting.stickers[index].gameOrigin.x, this.currentPainting.stickers[index].gameOrigin.y)
    console.log('particle emitted at: ', this.currentPainting.stickers[index].gameOrigin)
    //this.currentPainting.stickers[index].image.setPosition(-5000, 0)
    this.currentPainting.removeSticker(this.currentPainting.stickers[index])
    // decrement num stickers left
    this.numStickersLeft--
    console.log(this.numStickersLeft)
    // decrement num stickers left per painting
    this.numStickersLeftPerPainting[this.paintings.indexOf(this.currentPainting)]--
    console.log(this.numStickersLeftPerPainting)
    // check if any stickers are left
    if (this.numStickersLeft === 0) {
      // go to win scene
      this.win()
    }
  }

  win () {
    // stop current scene
    this.game.scene.stop('GameScene')
    // fix textures persisting TODO
    this.removePaintingTextures(this.levelData)
    // start win scene
    this.game.scene.start('WinScene')
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
      this.load.image('Painting' + (i + 1), path + 'Painting' + (i + 1) + '/' + thisPainting.name)
      // get number of stickers
      console.log('numStickers: ' + thisPainting.numStickers)
      const numStickers = thisPainting.numStickers
      // loop and load
      for (let j = 0; j < numStickers; j++) {
        // load
        const stickerPath = path + 'Painting' + (i + 1) + '/' + thisPainting.stickers[j]
        console.log('loading sticker: ' + stickerPath)
        this.load.image('Painting' + (i + 1) + 'Sticker' + (j + 1), stickerPath)
        // increment number of stickers in level
        this.numStickers++
        // increment number of stickers in painting
        this.numStickersPerPainting[i]++
      }
      // get number of silhouettes
      const numSilhouettes = thisPainting.numSilhouettes
      // loop and load
      for (let k = 0; k < numSilhouettes; k++) {
        // load
        const silhouettePath = path + 'Painting' + (i + 1) + '/' + thisPainting.silhouettes[k]
        console.log('loading silhouette: ' + silhouettePath)
        this.load.image('Painting' + (i + 1) + 'Silhouette' + (k + 1), silhouettePath)
      }
    }
  }

  removePaintingTextures (levelData) {
    // get number of paintings in level
    const numPaintings = levelData.numPaintings
    // loop through them
    for (let i = 0; i < numPaintings; i++) {
      // get thisPainting
      const thisPainting = levelData.paintings[i]
      // remove
      this.textures.remove('Painting' + (i + 1))
      // get number of stickers
      console.log('numStickers: ' + thisPainting.numStickers)
      const numStickers = thisPainting.numStickers
      // loop and remove
      for (let j = 0; j < numStickers; j++) {
        this.textures.remove('Painting' + (i + 1) + 'Sticker' + (j + 1))
      }
      // get number of silhouettes
      const numSilhouettes = thisPainting.numSilhouettes
      // loop and remove
      for (let k = 0; k < numSilhouettes; k++) {
        this.textures.remove('Painting' + (i + 1) + 'Silhouette' + (k + 1))
      }
    }
  }
}

export default GameScene
