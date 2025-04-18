class Inventory {
  constructor (stickers = [], newSilhouettes = [], id = 1) {
    const foundStickers = []
    const silhouettes = []
    // this.image = image;
    this.foundStickers = stickers
    this.silhouettes = newSilhouettes
    this.id = id
    // array of points for sticker slots
  }

  //Holds the stickers and Silhouettes
  addSticker (newSticker) {
    this.foundStickers.push(newSticker)
    this.silhouettes.push(newSticker.getSilhouette())
  }

  getID () {
    return this.id
  }

  getSticker (index) {
    return this.foundStickers[index]
  }

  getLength () {
    return this.foundStickers.length
  }

  emptyInventory () {
    this.foundStickers.length = 0
    this.silhouettes.length = 0
  }
}
export default Inventory
