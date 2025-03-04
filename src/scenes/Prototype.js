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
    this.load.image('Inventory', 'assets/Picture_Perfect_Inventory_3Slot_S_Claire.png')
    this.load.image('Frame', 'assets/Picture perfect- Frame.png')
  }

  /*sticker = {
    stickerImage: this.add.image(0,0,''),
    silhouetteImage: this.add.image(0,0,''),
    handlePointerDown: function(pointer){
      Util.handlePointerDown(pointer, this.stickerImage, silhouetteImage)
    }
  } */

  create () {


    const cowFarm = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'CowFarm')
    cowFarm.setScale(
      CONFIG.DEFAULT_WIDTH / cowFarm.width ,
      CONFIG.DEFAULT_HEIGHT / cowFarm.height
    )
    
    this.add.image(975, 550, 'Frame').setScale(1.55)
    ss.silhouetteOne = this.add.image(1000, 970, 'Inventory').setScale(0.8)
    ss.stickerOne = this.add.image(350, 750, 'BuffaloSticker').setInteractive()
    
    

    ss.stickerOne.on('pointerdown', this.handleBlueBoxPointerDown)

    // Testing making more objects
    //ss.silhouetteTwo = this.add.image(550, 200, 'RedBox');
    //ss.stickerTwo = this.add.image(600, 400, 'BlueBox').setInteractive();

    //stickerTwo.on('pointerdown', (pointer) => this.handleBlueBoxPointerDown(pointer, stickerTwo, silhouetteTwo));
    
    
  }

  // function registerStickerPointerDown(sticker){
   // sticker.on('pointerdown', (pointer) => this.handleBlueBoxPointerDown(pointer, sticker))
// }

  handleBlueBoxPointerDown (pointer) {
    Util.handlePointerDown(pointer, ss.stickerOne, ss.silhouetteOne)
    //doesn't work cuz scope or something
    //this.handlePointerDown(pointer, this.BlueBox, this.RedBox)
  } 

}



export default PrototypeScene