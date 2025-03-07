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
}
export default Silhouette