import Phaser from 'phaser'


class PrototypeScene extends Phaser.Scene {
  preload () {
    //this is where to load images or in StartScene
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
  }

  create () {
    this.add.image(200, 200, 'BlueBox')
    this.add.image(300, 300, 'RedBox')
  }
}

export default PrototypeScene