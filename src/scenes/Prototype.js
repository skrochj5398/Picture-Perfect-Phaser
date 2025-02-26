import Phaser from 'phaser'
import Util from '../util'
import ss from '../models/PrototypeModel'
=======
import Phaser from 'phaser'

>>>>>>> JudgeXiong
import CONFIG from '../config.js'

class PrototypeScene extends Phaser.Scene {

  preload () {
    //this is where to load images or in StartScene
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
    this.load.image('CowFarm', 'assets/wivenhoe_park,_essex_1942.9.10.png')
    this.load.image('BuffaloSticker', 'assets/Buffalo Sticker.png')
  }


  create () {
    ss.silhouetteOne = this.add.image(300, 300, 'RedBox')
    ss.stickerOne = this.add.image(200, 200, 'BlueBox').setInteractive()
    

    ss.stickerOne.on('pointerdown', this.handleBlueBoxPointerDown)

    const cowFarm = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'CowFarm')
    cowFarm.setScale(
      CONFIG.DEFAULT_WIDTH / cowFarm.width ,
      CONFIG.DEFAULT_HEIGHT / cowFarm.height
    )
  }

  handleBlueBoxPointerDown (pointer) {
    Util.handlePointerDown(pointer, ss.stickerOne, ss.silhouetteOne)
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
=======
   const BlueBox = this.add.image(200, 200, 'BlueBox').setInteractive()
    this.add.image(300, 300, 'RedBox')
    const cowFarm = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'CowFarm')
    cowFarm.setScale(
      CONFIG.DEFAULT_WIDTH / cowFarm.width ,
      CONFIG.DEFAULT_HEIGHT / cowFarm.height
    )

    this.add.image(200, 750, 'BuffaloSticker')


    BlueBox.on('pointerdown', function(pointer){
      //clicking... probably
      console.log('clicked!')
    })
>>>>>>> JudgeXiong
  }

  

}



export default PrototypeScene