import Phaser from 'phaser'
import Util from '../util'
import ss from '../models/PrototypeModel'
import Sticker from '../models/Sticker'
import Silhouette from '../models/Silhouette'
import CONFIG from '../config.js'
import Frame from './Frame.js'
import EMITTER from '../models/Emitter.js'

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
    this.load.image('Frame2', 'assets/sprites/Picture perfect- Frame2 (extra).png')
    this.load.image('Frame3', 'assets/sprites/Picture perfect- Frame3.png')
  }

  /*sticker = {
    stickerImage: this.add.image(0,0,''),
    silhouetteImage: this.add.image(0,0,''),
    handlePointerDown: function(pointer){
      Util.handlePointerDown(pointer, this.stickerImage, silhouetteImage)
    }
  } */

  create () {


    const cowFarm = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06, 'CowFarm')

    //Slicing the frame to make it not distorted
    const Frame = this.add.nineslice(CONFIG.DEFAULT_WIDTH / 1.98, CONFIG.DEFAULT_HEIGHT / 1.96, 'Frame', 0, 1920, 1080, 32, 32, 32, 32)

    
    ss.silhouetteOne = this.add.nineslice(1000, 1010, 'Inventory', 0, 1000, 300, 32, 32, 32, 32).setScale(.5)
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
    /*const BlueBox = this.add.image(500, 500, 'BlueBox').setScale(0.5);
    const RedBox = this.add.image(500, 500, 'RedBox').setScale(0.5);
    var silhouetteTwo;
    var stickerTwo = new Sticker(BlueBox, silhouetteTwo, 2);
    silhouetteTwo = new Silhouette (RedBox, stickerTwo, 2);
    //Testing setters
    stickerTwo.setSilhouette(stickerTwo, silhouetteTwo);
    stickerTwo.setLocation(stickerTwo, 100, 100);
    silhouetteTwo.setLocation(silhouetteTwo, 300,300);
    //Testing getters
    console.log(stickerTwo.getID(stickerTwo));
    console.log(stickerTwo.getSilhouette(stickerTwo));
    console.log(silhouetteTwo.getID(silhouetteTwo));
    console.log(silhouetteTwo.getSticker(silhouetteTwo));*/

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