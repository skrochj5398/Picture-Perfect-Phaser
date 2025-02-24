import Phaser from 'phaser'


class PrototypeScene extends Phaser.Scene {
  preload () {
    //this is where to load images or in StartScene
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
  }

  create () {
    const BlueBox = this.add.image(200, 200, 'BlueBox').setInteractive()
    this.add.image(300, 300, 'RedBox')

    BlueBox.on('pointerdown', function(pointer){
      //clicking... probably
      console.log('clicked!')
    })
  }
}

export default PrototypeScene