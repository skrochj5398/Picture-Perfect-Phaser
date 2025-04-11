import Phaser from 'phaser'

class Slider extends Phaser.GameObjects.Container {
  constructor (scene, x, y, handleTexture) {
    super(scene, x, y)
    scene.add.existing(this)
    this.setSize(120, 80)
    this.setInteractive({ draggable: true })
    const handle = scene.add.image(0, 0, handleTexture)
    this.add(handle)
    this.on('drag', (pointer, dragX, dragY) => this.setPosition(dragX, dragY))
  }
}

export default Slider
