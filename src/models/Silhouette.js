class Silhouette {
  constructor (image, sticker, id) {
    this.image = image
    this.sticker = sticker
    this.id = id
    this.bounds = null
  }

  // test method
  setLocation (xCoordinate, yCoordinate) {
    this.image.setPosition(xCoordinate, yCoordinate)
  }

  // return the sticker linked to this silhouette
  getSticker () {
    return this.sticker
  }

  // get the silhouette's id
  getID () {
    return this.id
  }

  // change the sticker attached to this silhouette
  setSticker (sticker) {
    this.sticker = sticker
  }
}
export default Silhouette
