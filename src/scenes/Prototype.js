import Phaser from 'phaser'
import Util from '../util'
import ss from '../models/PrototypeModel'
import Sticker from '../models/Sticker'
import Silhouette from '../models/Silhouette'
import Inventory from '../models/Inventory'
import InventoryView from '../models/InventoryView'
import CONFIG from '../config.js'
import Frame from './Frame.js'
import EMITTER from '../models/Emitter.js'

class PrototypeScene extends Phaser.Scene {
  preload () {
    // this is where to load images or in StartScene
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')
    this.load.image('CowFarm', 'assets/wivenhoe_park,_essex_1942.9.10.png')
    this.load.image('BuffaloSticker', 'assets/Buffalo Sticker.png')
    this.load.image('BuffaloStickerPaintingSize', 'assets/buffalo_sticker_paintingSize.png')
    this.load.image('Inventory', 'assets/Picture_Perfect_Inventory_3Slot_S_Claire.png')
    this.load.image('Frame', 'assets/Picture perfect- Frame.png')
    this.load.image('Frame4', 'assets/Picture perfect- Frame2.png')
    this.load.image('Frame2', 'assets/sprites/Picture perfect- Frame2 (extra).png')
    this.load.image('Frame3', 'assets/sprites/Picture perfect- Frame3.png')
    this.load.image('cowNegative', 'assets/Buffalo Negative.png')

    // Load in particle effects
    this.load.image('red', 'assets/particles/red.png')
  }

  create () {
    const cowFarm = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06, 'CowFarm')

    // Slicing the frame to make it not distorted
    const Frame = this.add.nineslice(CONFIG.DEFAULT_WIDTH / 1.98, CONFIG.DEFAULT_HEIGHT / 1.96, 'Frame', 0, 1920, 1080, 32, 32, 32, 32)

    ss.silhouetteOne = this.add.nineslice(1000, 1010, 'Inventory', 0, 1000, 300, 32, 32, 32, 32).setScale(0.5)
    const cowNegative = this.add.image(1000, 800, 'cowNegative').setScale(0.6)
    const zone = this.add.zone(cowNegative.x, cowNegative.y, cowNegative.width, cowNegative.height).setRectangleDropZone(cowNegative.width, cowNegative.height)
    ss.stickerOne = this.add.image(400, 700, 'BuffaloSticker').setInteractive({ draggable: true }).setScale(0.8)

    // Create and configure a particle emitter
    this.emitter = this.add.particles(0, 0, 'red', {
      speed: 100,
      lifespan: 1000,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      emitting: false
    })
    ss.stickerOne.on('pointerup', () => { this.handleBlueBoxPointerDown() })

    ss.stickerOne.on('drop', (pointer) => {
      ss.stickerOne.x = zone.x
      ss.stickerOne.y = zone.y

      ss.stickerOne.input.enabled = false

      console.log('Dropped.')
      ss.stickerOne.destroy()
      cowNegative.destroy()
    })

    ss.stickerOne.on('dragend', (pointer, dragX, dragY, dropped) => {
      console.log(dropped)
      if (!dropped) {
        ss.stickerOne.x = ss.stickerOne.input.dragStartX
        ss.stickerOne.y = ss.stickerOne.input.dragStartY
        console.log('running my code')
      }
    })
  }

  handleBlueBoxPointerDown (pointer) {
    this.emitter.emitParticleAt(ss.stickerOne.x, ss.stickerOne.y)
    Util.handlePointerDown(pointer, ss.stickerOne, ss.silhouetteOne)
    ss.stickerOne.off('pointerup')
    ss.stickerOne.on('drag', (pointer, dragX, dragY) => {
      ss.stickerOne.setPosition(dragX, dragY)
    })
    // doesn't work cuz scope or something
    // this.handlePointerDown(pointer, this.BlueBox, this.RedBox)
  }
}
export default PrototypeScene
