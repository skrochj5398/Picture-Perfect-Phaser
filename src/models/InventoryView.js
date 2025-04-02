import Inventory from '../models/Inventory'
import CONFIG from '../config.js'

class InventoryView {
  // constructor
  constructor (originX, originY, gap, Inventory){
    this.xPos = originX;
    this.yPos = originY;
    this.spacing = gap;
    this.Inventory = Inventory;
    // this.slots = new Array();
    this.slots = [];
    //this.occupiedSlots = 0;
  }
  addSticker(newSticker){
    this.Inventory.addSticker(newSticker);
    this.slots.push(newSticker.image);
    //this.occupiedSlots++;
  }
  reset(){
    this.Inventory.emptyInventory();
    this.slots.length = 0;
    //this.occupiedSlots = 0;
  }
}