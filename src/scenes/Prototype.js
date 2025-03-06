import Phaser from 'phaser'
import Util from '../util'
import ss from '../models/PrototypeModel'
import Sticker from '../models/Sticker'
import Silhouette from '../models/Silhouette'
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

  /*sticker = {
    stickerImage: this.add.image(0,0,''),
    silhouetteImage: this.add.image(0,0,''),
    handlePointerDown: function(pointer){
      Util.handlePointerDown(pointer, this.stickerImage, silhouetteImage)
    }
  } */

  create () {

    const Frame = this.add.image(CONFIG.DEFAULT_WIDTH / 1.98, CONFIG.DEFAULT_HEIGHT / 1.96, 'Frame')
    Frame.setScale(
      CONFIG.DEFAULT_WIDTH / Frame.width * 1.05,
      CONFIG.DEFAULT_HEIGHT / Frame.height * 1.16
    )

    const cowFarm = this.add.image(CONFIG.DEFAULT_WIDTH / 2.02, CONFIG.DEFAULT_HEIGHT / 2.06, 'CowFarm')
    
    ss.silhouetteOne = this.add.image(1000, 1010, 'Inventory').setScale(.5)
    ss.stickerOne = this.add.image(400, 700, 'BuffaloSticker').setInteractive().setScale(.8)

    /*const testSticker = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 
      'BuffaloStickerPaintingSize')
    testSticker.setScale(
      CONFIG.DEFAULT_WIDTH / testSticker.width ,
      CONFIG.DEFAULT_HEIGHT / testSticker.height
    )*/
    //console.log(Util.findSticker(this.textures, 'BuffaloStickerPaintingSize'))


    ss.stickerOne.on('pointerdown', this.handleBlueBoxPointerDown)

    // Testing making more objects
    var silhouetteTwo;
    var stickerTwo = new Sticker('BlueBox', silhouetteTwo, 2);
    silhouetteTwo = new Silhouette ('RedBox', stickerTwo, 2);
    stickerTwo.setLocation(100, 100);
    silhouetteTwo.setLocation(300,300);

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