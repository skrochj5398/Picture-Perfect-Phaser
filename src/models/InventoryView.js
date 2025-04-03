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
}
export default InventoryView;