import Phaser from 'phaser'
import CONFIG from '../config.js'
import Painting from '../models/Painting.js'
import Sticker from '../models/Sticker.js'

class JessieTestScene extends Phaser.Scene {

  preload () {
    //this is where to load images or in StartScene
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
    this.load.image('CowFarm', 'assets/wivenhoe_park,_essex_1942.9.10.png')
    this.load.image('Painting1', 'assets/Painting1.png')
    this.load.image('BuffaloSticker', 'assets/Buffalo Sticker.png')
    this.load.image('BuffaloStickerPaintingSize', 'assets/buffalo_sticker_paintingSize.png')
    this.load.image('Inventory', 'assets/Picture_Perfect_Inventory_3Slot_S_Claire.png')
    this.load.image('Frame', 'assets/Picture perfect- Frame.png')
  }


  create () {

    const Frame = this.add.nineslice(CONFIG.DEFAULT_WIDTH / 1.98, CONFIG.DEFAULT_HEIGHT / 1.96, 'Frame', 0, 1920, 1080, 32, 32, 32, 32)

    const cowFarm = this.add.image(0, 0, 'CowFarm')
    const painting1 = this.add.image(0, 0, 'Painting1')

    const inventory = this.add.image(1000, 1010, 'Inventory').setScale(.5)
    //ss.stickerOne = this.add.image(400, 700, 'BuffaloSticker').setInteractive().setScale(.8)
    //let silhouette
    //const testStickerImg = this.add.image(0,0,'BuffaloSticker').setInteractive()
    //this.testSticker = new Sticker(testStickerImg, silhouette, 0)
    //TODO apply interact function on sticker to test removeSticker in its environment
    // making it an arrow function works, but holds up a lot of data
    //this.testSticker.image.on('pointerdown', () => {this.handleTestStickerPointerDown(this)})
    // static doesn't work
    //this.testSticker.image.on('pointerdown', JessieTestScene.handleTestStickerPointerDown)
    // passing this scene to it doesn't work
    //this.testSticker.image.on('pointerdown', this.handleTestStickerPointerDown)

    console.log('about to create a painting...')
    this.testPainting = new Painting(
      cowFarm, 
      new Array('BuffaloStickerPaintingSize'), 
      null, 
      this
    )
    this.testPainting2 = new Painting(
      painting1, 
      null, 
      null, 
      this
    )

    //get the stickers and save them; used in on click function
    this.stickers = this.testPainting.stickers
    // attach a function to a sticker
    this.stickers[0].image.on('pointerdown', () => {this.handleTestStickerPointerDown()})
    
    //create an array of paintings on this scene
    this.paintings = new Array(this.testPainting,  this.testPainting2)
    this.currentPainting = this.paintings[0]
    // attach functions to move up or down the array
    this.blueBox = this.add.image(10, CONFIG.DEFAULT_HEIGHT / 2, 'BlueBox').setInteractive()
    this.redBox = this.add.image(CONFIG.DEFAULT_WIDTH - 10, CONFIG.DEFAULT_HEIGHT / 2, 'RedBox').setInteractive()
    this.blueBox.on('pointerdown', () => {this.lastPainting()})
    this.redBox.on('pointerdown', () => {this.nextPainting()})

    this.currentPainting.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)
  }

  handleTestStickerPointerDown () {
    console.log("running click function")
    this.stickers[0].setLocation(this.stickers[0], -100, -100)
    this.testPainting.removeSticker(this.stickers[0])
  } 

  nextPainting () {
    //move the current painting offscreen
    this.currentPainting.setPosition(-3000,-3000)
    //get the next index of the paintings Array
    let nextIndex = this.paintings.indexOf(this.currentPainting) + 1
    //check if nextIndex is past the end
    if (nextIndex >= this.paintings.length) {
      //reset back to the start
      console.log("looping paintings")
      nextIndex = 0
    }
    //change current painting to that one
    // change new paintings position to center of screen TODO update when frames are fixed
    this.paintings[nextIndex].setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)
    // change this.currentPainting
    this.currentPainting = this.paintings[nextIndex]
  }

  lastPainting () {
    //move the current painting offscreen
    this.currentPainting.setPosition(-3000,-3000)
    //get the last index of the paintings Array
    let lastIndex = this.paintings.indexOf(this.currentPainting) - 1
    //check if lastIndex is past the end
    if (lastIndex < 0) {
      //reset back to the end
      console.log("looping paintings backwards")
      lastIndex = this.paintings.length - 1
    }
    //change current painting to that one
    // change new paintings position to center of screen TODO update when frames are fixed
    this.paintings[lastIndex].setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)
    // change this.currentPainting
    this.currentPainting = this.paintings[lastIndex]
  }

}



export default JessieTestScene