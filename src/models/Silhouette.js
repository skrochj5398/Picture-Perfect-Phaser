class Silhouette {
  constructor(image, sticker, id){
    this.image = image;
    this.sticker = sticker;
    this. id = id;
  }
  // test method
  setLocation(imageN, xCoordinate, yCoordinate){
    imageN.image.setPosition(xCoordinate, yCoordinate);
  }
  // return the sticker linked to this silhouette
  getSticker(silhouette){
    return silhouette.sticker;
  }
  // get the silhouette's id
  getID(silhouette){
    return silhouette.id;
  }
  // change the sticker attached to this silhouette
  setSilhouette(silhouette, sticker){
    silhouette.sticker = sticker;
  }
}
export default Silhouette