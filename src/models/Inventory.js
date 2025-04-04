class Inventory{
  constructor(image, stickers, newSilhouettes, id){
    const foundStickers = [];
    const silhouettes = [];
    this.image = image;
    this.foundStickers = stickers;
    this.silhouettes = newSilhouettes
    this.id = id;
  }
  addSticker(newSticker){
    this.foundStickers.push(newSticker);
    newSticker.image.diasbleInterative()
  }
  getID(){
    return this.id;
  }
  getSticker(index){
    return this.foundStickers[index];
  }
}
export default Inventory;