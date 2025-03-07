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
}
// class Silhouette {
//   constructor(image, sticker, id){
//     this.image = image;
//     this.sticker = sticker;
//     this. id = id;
//   }
// }
export default Sticker