class Sticker {
  constructor(image, silhouette, id){
    this.image = image;
    this.silhouette = silhouette;
    this.id = id;
  }
  // test method
  setLocation(xCoordinate, yCoordinate){
    this.image.style.position = "absolute";
    this.image.style.left = xCoordinate + "px";
    this.image.style.top = yCoordinate + "px";
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