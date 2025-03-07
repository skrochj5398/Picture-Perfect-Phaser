class Sticker {
  constructor(image, silhouette, id){
    this.image = image;
    this.silhouette = silhouette;
    this.id = id;
  }
  // test method
  setLocation(imageN, xCoordinate, yCoordinate){
    imageN.image.setPosition(xCoordinate, yCoordinate);
  }
  // return the silhouette linked to this sticker
  getSilhouette(sticker){
    return sticker.silhouette;
  }
  // get the sticker's id
  getID(sticker){
    return sticker.id;
  }
  // change the silhouette attached to this sticker
  setSilhouette(sticker, silhouette){
    sticker.silhouette = silhouette;
  }
}
export default Sticker