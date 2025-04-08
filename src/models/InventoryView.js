import Inventory from '../models/Inventory'
import CONFIG from '../config.js'

class InventoryView {
  // constructor
  constructor (image = null, originX = 0, originY = 0, gap = 1, Inventory){
    this.xPos = originX;
    this.yPos = originY;
    this.spacing = gap;
    this.image = image
    this.Inventory = Inventory;
    // this.slots = new Array();
    this.stickers = [];
    this.slotsDirection = -1;
    this.slots = [];
    this.stickersFound = 0;
  }
  addSticker(newSticker){
    this.Inventory.addSticker(newSticker);
    this.stickers.push(newSticker.image);
    //this.slotsDirection * -1;
  }
  reset(){
    this.Inventory.emptyInventory();
    this.stickers.length = 0;
    this.slotsDirection = -1;
    this.slots.length = 0;
  }
  // method to draw inventory slots at beginning of play
  draw(scene){
    var tempX = this.xPos;
    var tempSpace = this.spacing;
    //console.log('Drawing inventory');
    //console.log('Slots: ' + this.Inventory.getLength() + ' gap: ' + this.spacing)
    //console.log(this.slotsDirection);
    for (var i = 0; i < this.Inventory.getLength(); ++i){
      this.slots.push(scene.add.image(this.xPos, this.yPos, this.image).setScale(.5));
      this.slotsDirection = this.slotsDirection * -1;
      //console.log(this.slotsDirection);
      //console.log(this.xPos);
      this.xPos = (this.xPos + (this.spacing * this.slotsDirection));
      this.spacing = this.spacing + tempSpace;
    }
    this.xPos = tempX;
    console.log('Done Drawing');
  }
  // method to draw inventory with newly-added sticker
  drawNewSticker(sticker, scene){
    console.log(sticker.image);
    console.log('Drawing new sticker');
    this.addSticker(sticker);
    console.log(this.stickers[this.stickersFound]);
    scene.add.image(this.slots[this.stickersFound].x,
      this.slots[this.stickersFound].y, this.stickers[this.stickersFound].texture);//.setScale(2.5);
      this.stickersFound++;
    console.log('Done Drawing sticker');
  }
}
export default InventoryView;