class Inventory{
  constructor(image = null, stickers = [], newSilhouettes = [], id = 1){
    const foundStickers = [];
    const silhouettes = [];
    this.image = image;
    this.foundStickers = stickers;
    this.silhouettes = newSilhouettes
    this.id = id;
    // array of points for sticker slots
  }
  addSticker(newSticker){
    this.foundStickers.push(newSticker);
  }
  getID(){
    return this.id;
  }
  getSticker(index){
    return this.foundStickers[index];
  }
}
export default Inventory;