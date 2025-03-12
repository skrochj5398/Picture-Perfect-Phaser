import Phaser from 'phaser'
import Util from '../util.js'
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

    const Frame = this.add.image(CONFIG.DEFAULT_WIDTH / 1.98, CONFIG.DEFAULT_HEIGHT / 1.96, 'Frame')
    Frame.setScale(
      CONFIG.DEFAULT_WIDTH / Frame.width * 1.05,
      CONFIG.DEFAULT_HEIGHT / Frame.height * 1.16
    )

    const cowFarm = this.add.image(0, 0, 'CowFarm')

    ss.silhouetteOne = this.add.image(1000, 1010, 'Inventory').setScale(.5)
    //ss.stickerOne = this.add.image(400, 700, 'BuffaloSticker').setInteractive().setScale(.8)
    let silhouette
    const testStickerImg = this.add.image(0,0,'BuffaloSticker').setInteractive()
    this.testSticker = new Sticker(testStickerImg, silhouette, 0)
    //TODO apply interact function on sticker to test removeSticker in its environment
    // making it an arrow function works, but holds up a lot of data
    this.testSticker.image.on('pointerdown', () => {this.handleTestStickerPointerDown(this)})
    // static doesn't work
    //this.testSticker.image.on('pointerdown', JessieTestScene.handleTestStickerPointerDown)
    // passing this scene to it doesn't work
    //this.testSticker.image.on('pointerdown', this.handleTestStickerPointerDown)

    console.log('about to create a painting...')
    this.testPainting = new Painting(
      cowFarm, 
      new Array(this.testSticker), 
      new Array('BuffaloStickerPaintingSize'), 
      null, 
      this
    )

    //for now, just call removeSticker to see logs TODO remove after testing
    //testPainting.removeSticker(this.testSticker)
    
  }

  handleTestStickerPointerDown (scene) {
    scene.testPainting.removeSticker(this.testSticker)
    this.testSticker.setLocation(this.testSticker, -100, -100)
  } 

}



export default JessieTestScene