import Inventory from '../models/Inventory'
import CONFIG from '../config.js'
import Phaser from 'phaser'

class InventoryView {
  // constructor
  constructor (image = null, originX = 0, originY = 0, gap = 1, Inventory) {
    this.xPos = originX
    this.yPos = originY
    this.spacing = gap
    this.image = image
    this.Inventory = Inventory
    // this.slots = new Array();
    this.stickers = []
    this.slotsDirection = -1
    this.slots = []
    this.stickersFound = 0
    this.evenOffset = 57.5
  }

  addSticker (newSticker) {
    this.Inventory.addSticker(newSticker)
    this.stickers.push(newSticker.image)
    // this.slotsDirection * -1;
  }

  removeSticker (index) {
    this.Inventory.foundStickers.splice(index, 1);
  }

  reset () {
    this.Inventory.emptyInventory()
    this.stickers.length = 0
    this.slotsDirection = -1
    this.slots.length = 0
  }

  // method to draw inventory slots at beginning of play
  draw (scene) {
    const tempX = this.xPos
    if (this.Inventory.getLength() % 2 == 0){
      this.xPos -= this.evenOffset;
    }
    const tempSpace = this.spacing
    // console.log('Drawing inventory');
    // console.log('Slots: ' + this.Inventory.getLength() + ' gap: ' + this.spacing)
    // console.log(this.slotsDirection);
    for (let i = 0; i < this.Inventory.getLength(); ++i) {
      this.slots.push(scene.add.image(this.xPos, this.yPos, this.image).setScale(0.5).setDepth(99))
      this.slotsDirection = this.slotsDirection * -1
      // console.log(this.slotsDirection);
      // console.log(this.xPos);
      this.xPos = (this.xPos + (this.spacing * this.slotsDirection))
      this.spacing = this.spacing + tempSpace
    }
    this.xPos = tempX
    console.log('Done Drawing')
  }

  // method to draw inventory with newly-added sticker
  drawNewSticker (sticker, scene) {
    // console.log(sticker.image);
    console.log('Drawing new sticker')
    this.addSticker(sticker)
    sticker.image.setDepth(100)
    // console.log(this.stickers[this.stickersFound]);
    const location = new Phaser.Math.Vector2(this.slots[this.stickersFound].x,
      this.slots[this.stickersFound].y)
    sticker.offset.x = sticker.image.x - sticker.gameOrigin.x
    sticker.offset.y = sticker.image.y - sticker.gameOrigin.y
    this.stickersFound++
    // desired scale = largest sticker can be while having x & y <= inventory slot's x & y
    let ratio = sticker.image.scale
    // Scale should be the smaller of the ratios between the slots x and y and the sticker's x and y
    const xRatio = this.slots[0].width / sticker.realScale.x
    const yRatio = this.slots[0].height / sticker.realScale.y
    ratio = Math.min(xRatio, yRatio)

    // offset = offset * ratio
    sticker.image.setScale(sticker.image.scale * ratio)
    sticker.image.setScale(sticker.image.scale / 2)
    sticker.offset.x = sticker.offset.x * ratio / 2
    sticker.offset.y = sticker.offset.y * ratio / 2
    const realPosition = new Phaser.Math.Vector2(location.x + sticker.offset.x,
      location.y + sticker.offset.y)
    console.log('slot x: ' + this.slots[this.stickersFound - 1].x)
    console.log('slot y: ' + this.slots[this.stickersFound - 1].y)
    console.log('sticker x: ' + realPosition.x)
    console.log('sticker y: ' + realPosition.y)
    sticker.setLocation(realPosition.x, realPosition.y)
    console.log('Done Drawing sticker')
  }
}
export default InventoryView
