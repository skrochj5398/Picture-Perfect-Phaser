import Phaser, { AUTO } from 'phaser'

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
<<<<<<< Updated upstream
    this.add.image(200, 200, 'BlueBox')
    this.add.image(300, 300, 'RedBox')
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
>>>>>>> Stashed changes
  }

  
}

export default PrototypeScene