import Phaser from 'phaser'

class Sticker {
  constructor(image, silhouette, id) {
    this.image = image
    this.silhouette = silhouette
    this.id = id
    this.gameOrigin = new Phaser.Math.Vector2(-10, -10)
    //this.realPosition = new Phaser.Math.Vector2(this.position - this.gameOrigin)
    this.offset = (0, 0)
    //this.of
  }

  // test method
  setLocation(xCoordinate, yCoordinate) {
    this.image.setPosition(xCoordinate, yCoordinate)
  }

  // return the silhouette linked to this sticker
  getSilhouette() {
    return this.silhouette
  }

  // get the sticker's id
  getID() {
    return this.id
  }

  // change the silhouette attached to this sticker
  setSilhouette(silhouette) {
    this.silhouette = silhouette
  }
}
export default Sticker
