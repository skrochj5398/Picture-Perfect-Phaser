import Phaser from 'phaser'
import CONFIG from '../config.js'
import Painting from '../models/Painting.js'
import Inventory from '../models/Inventory.js'
import InventoryView from '../models/InventoryView.js'
import Silhouette from '../models/Silhouette.js'

class BetaScene extends Phaser.Scene {

  init() {
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Loading...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    )
    this.loadingText.setOrigin(0.5, 0.5)
  }

  preload () {
    // this is where to load images or in StartScene
    // temp images for left and right buttons
    this.load.image('ArrowLeft', 'assets/sprites/Arrow_Left.png')
    this.load.image('ArrowRight', 'assets/sprites/Arrow_Right.png')

    // Load in particle effects
    this.load.image('red', 'assets/particles/red.png')

    // paintings
    this.load.image(
      'Painting1', 
      'assets/Levels/Level3/Painting1/the_last_of_the_buffalo_2014.79.5.png'
    )
    this.load.image(
      'Painting2', 
      'assets/Levels/Level3/Painting2/joshua_commanding_the_sun_to_stand_still_upon_gibeon_2004.64.1.png'
    )
    this.load.image(
      'Painting3', 
      'assets/Levels/Level3/Painting3/wivenhoe_park,_essex_1942.9.10.png'
    )
    this.load.image(
      'Painting4', 
      'assets/Levels/Level3/Painting4/the_voyage_of_life__youth_1971.16.2.png'
    )

    this.load.image('InventorySlot', 'assets/InventorySlot.png');
    // load paintings from json file
    this.load.json('levelData', 'assets/Levels/Levels.json')
    // create json object
    


    // stickers and silhouettes for each painting (this'll get long)
    //  Painting1
    this.load.image(
      'Painting1Silhouette1',
      'assets/Levels/Level3/Painting1/Buffalo Negative.png'
    )
    this.load.image(
      'Painting1Silhouette2',
      'assets/Levels/Level3/Painting1/Skull Negative.png'
    )
    this.load.image(
      'Painting1Sticker1',
      'assets/Levels/Level3/Painting1/Soldier Sticker.png'
    )
    // Painting2
    this.load.image(
      'Painting2Sticker1',
      'assets/Levels/Level3/Painting2/Angel Sticker.png'
    )
    this.load.image(
      'Painting2Silhouette1',
      'assets/Levels/Level3/Painting2/Charging Soldier Negative.png'
    )
    this.load.image(
      'Painting2Silhouette2',
      'assets/Levels/Level3/Painting2/Soldier Negative.png'
    )
    // Painting3
    this.load.image(
      'Painting3Silhouette1',
      'assets/Levels/Level3/Painting3/Boat Negative.png'
    )
    this.load.image(
      'Painting3Sticker1',
      'assets/Levels/Level3/Painting3/Buffalo Sticker.png'
    )
    this.load.image(
      'Painting3Sticker2',
      'assets/Levels/Level3/Painting3/Charging Soldier Sticker.png'
    )
    this.load.image(
      'Painting3Silhouette2',
      'assets/Levels/Level3/Painting3/Cow Negative.png'
    )
    // Painting4
    this.load.image(
      'Painting4Silhouette1',
      'assets/Levels/Level3/Painting4/Angel Negative.png'
    )
    this.load.image(
      'Painting4Sticker1',
      'assets/Levels/Level3/Painting4/Boat Sticker.png'
    )
    this.load.image(
      'Painting4Sticker2',
      'assets/Levels/Level3/Painting4/Cow Sticker.png'
    )
    this.load.image(
      'Painting4Sticker3',
      'assets/Levels/Level3/Painting4/Skull Sticker.png'
    )

    // inventory & frame
    this.load.image('Inventory', 'assets/Picture_Perfect_Inventory_3Slot_S_Claire.png')
    this.load.image('Frame', 'assets/Picture perfect- Frame.png')
    this.load.image('Frame2', 'assets/Picture perfect- Frame2.png')
  }

  create () {
    // uncomment to work on json
    /*const data = this.cache.json.get('levelData')
    // make sure the json is working
    console.log(JSON.stringify(data))
    console.log("numLevels from json: " + data.numLevels)
    //it's working!!!

    // create path to simplify + specific level folder
    
    // loopception
    // get index of current level
    const levelIndex = 0
    // get current level data
    const thisLevel = data.levels[levelIndex]
    // add name to path
    let path = 'assets/Levels/' + thisLevel.name + '/'
    // get number of paintings in level
    const numPaintings = thisLevel.numPaintings
    // loop through them
    for (let i = 0; i < numPaintings; i++) {
      // get thisPainting
      const thisPainting = thisLevel.paintings[i]
      // load the painting
      this.load.image('Painting' + i, path + 'Painting' + i + '/' + thisPainting.name)
      // get number of stickers
      const numStickers = thisPainting.numStickers
      // loop and load
      for (let i = 0; i < numStickers; i++) {
        // load

      }
      // get number of silhouettes
      const numSilhouettes = thisPainting.numSilhouettes
      // loop and load
      for (let i = 0; i < numSilhouettes; i++) {
        // load
        
      }
    }*/
    this.loadingText.destroy()

    // variable to hold the number of stickers (for creating the inventory)
    //const numStickers = 0;

    //var inventory = this.add.image(1000, 1010, 'Inventory').setScale(.5)

    // pass silhouettes too, in an array of Silhouettes with ids concat(painting#, silhouette#)
    // define after Frame so frame doesn't block click events (must more blood be shed!?)
    const painting1 = new Painting(
      'Painting1',
      new Array('Painting1Sticker1'),
      new Array(
        new Silhouette(this.add.image(0, 0, 'Painting1Silhouette1'), null, 11),
        new Silhouette(this.add.image(0, 0, 'Painting1Silhouette2'), null, 12)
      ),
      this
    )
    const painting2 = new Painting(
      'Painting2',
      new Array('Painting2Sticker1'),
      new Array(
        new Silhouette(this.add.image(0, 0, 'Painting2Silhouette1'), null, 21),
        new Silhouette(this.add.image(0, 0, 'Painting2Silhouette2'), null, 22)
      ),
      this
    )
    const painting3 = new Painting(
      'Painting3',
      new Array('Painting3Sticker1', 'Painting3Sticker2'),
      new Array(
        new Silhouette(this.add.image(0, 0, 'Painting3Silhouette1'), null, 31),
        new Silhouette(this.add.image(0, 0, 'Painting3Silhouette2'), null, 32)
      ),
      this
    )
    const painting4 = new Painting(
      'Painting4',
      new Array('Painting4Sticker1', 'Painting4Sticker2', 'Painting4Sticker3'),
      new Array(
        new Silhouette(this.add.image(0, 0, 'Painting4Silhouette1'), null, 41)
      ),
      this
    )

    // load the paintings into an array
    this.paintings = new Array(painting1, painting2, painting3, painting4)

    // create inventory
    var realInventory = new Inventory();
    this.paintingFrame = this.add.nineslice(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Frame', 0, 1920, 1080,
      81, 81, 81, 81
    )
    //const inventory = this.add.image(1000, 1010, 'Inventory').setScale(0.5)

    // Create and configure a particle emitter
    this.emitter = this.add.particles(0, 0, 'red', {
      speed: 100,
      lifespan: 1000,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      emitting: false
    })

    // attach a function to a sticker; should attach all of them
    console.log('about to attach click function')
    for (const painting of this.paintings) {
      for (let i = 0; i < painting.stickers.length; i++) {
        console.log('attaching event to sticker ', i)
        //numStickers++
        painting.stickers[i].image.on('pointerdown', () => {this.handleTestStickerPointerDown(i)})
        realInventory.addSticker(painting.stickers[i]);
      }
    }

    // Testing some nonsense
    //var gameWidth = CONFIG.DEFAULT_WIDTH;
    //var gameHeight = CONFIG.DEFAULT_HEIGHT;
    this.inventoryView = new InventoryView('InventorySlot', 960, 1035, 125, realInventory);
    this.inventoryView.draw(this);
    //console.log('drawing inventory');
    // stickerArray = new Array();
    // stickerArray = stickerArray.concat()
    // const realInventory = new Inventory()
    
    //set first painting and position it
    //this.currentPainting = this.paintings[0]
    //this.currentPainting.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)
    this.updatePainting(0)

    // attach functions to move up or down the array
    this.arrowLeft = this.add.image(55, CONFIG.DEFAULT_HEIGHT / 2, 'ArrowLeft').setInteractive()
    this.arrowRight = this.add.image(CONFIG.DEFAULT_WIDTH - 55, CONFIG.DEFAULT_HEIGHT / 2, 'ArrowRight').setInteractive()
    this.arrowLeft.setScale(0.5)
    this.arrowRight.setScale(0.5)
    this.arrowLeft.on('pointerdown', () => {this.lastPainting()})
    this.arrowRight.on('pointerdown', () => {this.nextPainting()})
  }

  handleTestStickerPointerDown (index) {
    console.log("running click function")
    this.inventoryView.drawNewSticker(this.currentPainting.stickers[index], this);
    this.emitter.emitParticleAt(this.currentPainting.stickers[index].gameOrigin.x, this.currentPainting.stickers[index].gameOrigin.y)
    console.log('particle emitted at: ', this.currentPainting.stickers[index].gameOrigin)
    //this.currentPainting.stickers[index].image.setPosition(-5000, 0)
    this.currentPainting.removeSticker(this.currentPainting.stickers[index])
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
}

export default BetaScene