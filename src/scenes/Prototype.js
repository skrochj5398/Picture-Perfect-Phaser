import Phaser from 'phaser'
import Util from '../util'
import ss from '../models/PrototypeModel'

class PrototypeScene extends Phaser.Scene {

  preload () {
    //this is where to load images or in StartScene
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
  }

  sticker = {
    stickerImage: this.add.image(0,0,''),
    silhouetteImage: this.add.image(0,0,''),
    handlePointerDown: function(pointer){
      Util.handlePointerDown(pointer, this.stickerImage, silhouetteImage)
    }
  }

  create () {
    ss.silhouetteOne = this.add.image(300, 300, 'RedBox')
    ss.stickerOne = this.add.image(200, 200, 'BlueBox').setInteractive()
    

    ss.stickerOne.on('pointerdown', this.handleBlueBoxPointerDown)

    // Testing making more objects
    ss.silhouetteTwo = this.add.image(550, 200, 'RedBox');
    ss.stickerTwo = this.add.image(600, 400, 'BlueBox').setInteractive();

    //stickerTwo.on('pointerdown', (pointer) => this.handleBlueBoxPointerDown(pointer, stickerTwo, silhouetteTwo));
    
    
  }

  // function registerStickerPointerDown(sticker){
   // sticker.on('pointerdown', (pointer) => this.handleBlueBoxPointerDown(pointer, sticker))
// }

  handleBlueBoxPointerDown (pointer, sticker) {
    Util.handlePointerDown(sticker, silhouette)
    //doesn't work cuz scope or something
    //this.handlePointerDown(pointer, this.BlueBox, this.RedBox)
  } 

  /**
   * use to handle 'pointerdown' events on the sticker object passed.
   * the silhouette object should be where to move it to
   * the pointer gets automatically passed to the event function, so when the function is added
   * it should be declared inline and call this function with the appropriate variables
   * @param {Phaser.Input.Pointer} pointer 
   * @param {Phaser.image} sticker 
   * @param {Phaser.image} silhouette 
   */
  handlePointerDown (pointer, sticker, silhouette) {
    //clicking... probably
    console.log('clicked!')
    //move the image to RedBox
    console.log(silhouette.x, silhouette.y)
    sticker.setPosition(silhouette.x, silhouette.y)
  }

}



export default PrototypeScene