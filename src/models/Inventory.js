class Inventory{
  constructor(image, stickers, newSilhouettes, id){
    const foundStickers = [];
    const silhouettes = [];
    this.image = image;
    this.foundStickers = stickers;
    this.silhouettes = newSilhouettes
    this.id = id;
  }
  addSticker(inventory, newSticker){

  }
  getID(inventory){
    return inventory.id;
  }
}
export default Inventory;