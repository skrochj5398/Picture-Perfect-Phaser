import Phaser from 'phaser'
import Util from '../util'
import ss from '../models/PrototypeModel'
import CONFIG from '../config.js'

class PrototypeScene extends Phaser.Scene {

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


    const cowFarm = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'CowFarm')
    cowFarm.setScale(
      CONFIG.DEFAULT_WIDTH / cowFarm.width ,
      CONFIG.DEFAULT_HEIGHT / cowFarm.height
    )
    
    this.add.image(975, 550, 'Frame').setScale(1.55)
    ss.silhouetteOne = this.add.image(1000, 970, 'Inventory').setScale(0.8)
    ss.stickerOne = this.add.image(350, 750, 'BuffaloSticker').setInteractive()

    const testSticker = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 
      'BuffaloStickerPaintingSize')
    testSticker.setScale(
      CONFIG.DEFAULT_WIDTH / testSticker.width ,
      CONFIG.DEFAULT_HEIGHT / testSticker.height
    )
    
    //console.log(Util.findSticker(this.textures, 'BuffaloStickerPaintingSize'))
    console.log(this.game.time.physicsElapsed);
    ss.stickerOne.on('pointerdown', this.handleBlueBoxPointerDown)
  }

  handleBlueBoxPointerDown (pointer) {
    Util.handlePointerDown(pointer, ss.stickerOne, ss.silhouetteOne)
    //doesn't work cuz scope or something
    //this.handlePointerDown(pointer, this.BlueBox, this.RedBox)
  } 

}



export default PrototypeScene