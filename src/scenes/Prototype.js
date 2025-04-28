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
    //this is where to load images or in StartScene
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

    //Load in particle effects
    this.load.image('red' , 'assets/particles/red.png')
  }

    static inventory1 = new Inventory()
    static slots = new InventoryView('InventorySlot');

  create () {


    const cowFarm = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06, 'CowFarm')
    cowFarm.on('pointerdown', () => {this.onPlayerClicked()})
    cowFarm.setInteractive();

    //Slicing the frame to make it not distorted
    //const Frame = this.add.nineslice(CONFIG.DEFAULT_WIDTH / 1.98, CONFIG.DEFAULT_HEIGHT / 1.96, 'Frame', 0, 1920, 1080, 32, 32, 32, 32)

    
    //ss.silhouetteOne = this.add.nineslice(1000, 1010, 'Inventory', 0, 1000, 300, 32, 32, 32, 32).setScale(.5)
    //ss.stickerOne = this.add.image(400, 700, 'BuffaloSticker').setInteractive().setScale(.8)
    //ss.stickerOne.on('pointerdown', () => {this.onPlayerClicked()})

    // Create and configure a particle emitter
    this.emitter = this.add.particles(0, 0, 'red', {
      speed: 100,
      lifespan: 1000,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      emitting: false
    })


    //ss.stickerOne.on('pointerdown', () => {this.handleBlueBoxPointerDown()})
    
  }

  // TODO:: Debug painting clicking

  // function registerStickerPointerDown(sticker){
   // sticker.on('pointerdown', (pointer) => this.handleBlueBoxPointerDown(pointer, sticker))
// }

  handleBlueBoxPointerDown (pointer) {
    this.emitter.emitParticleAt(ss.stickerOne.x, ss.stickerOne.y)
    Util.handlePointerDown(pointer, ss.stickerOne, ss.silhouetteOne)
    ss.stickerOne.disableInteractive()
    //doesn't work cuz scope or something
    //this.handlePointerDown(pointer, this.BlueBox, this.RedBox)
  } 

  // Method for paintings and stickers to handle clicks for scoring
  onPlayerClicked(){
    CONFIG.timesClicked++;
    console.log('Click!');
  }

}



export default PrototypeScene