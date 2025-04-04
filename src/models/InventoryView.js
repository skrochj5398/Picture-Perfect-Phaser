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
    this.slots = [];
    this.slotsDirection = -1;
  }
  addSticker(newSticker){
    this.Inventory.addSticker(newSticker);
    this.slots.push(newSticker.image);
    this.slotsDirection * -1;
  }
  reset(){
    this.Inventory.emptyInventory();
    this.slots.length = 0;
    this.slotsDirection = 0;
  }
  draw(scene){
    var tempX = this.xPos;
    var tempSpace = this.spacing;
    //console.log('Drawing inventory');
    //console.log('Slots: ' + this.Inventory.getLength() + ' gap: ' + this.spacing)
    //console.log(this.slotsDirection);
    for (var i = 0; i < this.Inventory.getLength(); ++i){
      scene.add.image(this.xPos, this.yPos, this.image).setScale(.5);
      this.slotsDirection = this.slotsDirection * -1;
      console.log(this.slotsDirection);
      console.log(this.xPos);
      this.xPos = (this.xPos + (this.spacing * this.slotsDirection));
      this.spacing = this.spacing + tempSpace;
    }
    this.xPos = tempX;
    console.log('Done Drawing');
  }
}
export default InventoryView;