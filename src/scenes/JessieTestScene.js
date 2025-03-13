import Phaser from 'phaser'
import ss from '../models/PrototypeModel.js'
import CONFIG from '../config.js'
import Painting from '../models/Painting.js'
import Sticker from '../models/Sticker.js'

class JessieTestScene extends Phaser.Scene {

  preload () {
    //this is where to load images or in StartScene
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
    this.load.image('CowFarm', 'assets/wivenhoe_park,_essex_1942.9.10.png')
    this.load.image('BuffaloSticker', 'assets/Buffalo Sticker.png')
    this.load.image('BuffaloStickerPaintingSize', 'assets/buffalo_sticker_paintingSize.png')
    this.load.image('Inventory', 'assets/Picture_Perfect_Inventory_3Slot_S_Claire.png')
    this.load.image('Frame', 'assets/Picture perfect- Frame.png')
  }


  create () {

    const Frame = this.add.nineslice(CONFIG.DEFAULT_WIDTH / 1.98, CONFIG.DEFAULT_HEIGHT / 1.96, 'Frame', 0, 1920, 1080, 32, 32, 32, 32)

    const cowFarm = this.add.image(0, 0, 'CowFarm')

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

    //get the stickers and save them; used in on click function
    this.stickers = this.testPainting.stickers
    // attach a function to a sticker
    this.stickers[0].image.on('pointerdown', () => {this.handleTestStickerPointerDown(this)})
    
  }

  handleTestStickerPointerDown (scene) {
    console.log("running click function")
    this.stickers[0].setLocation(this.stickers[0], -100, -100)
    scene.testPainting.removeSticker(this.stickers[0])
  } 

}



export default JessieTestScene