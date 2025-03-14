class Sticker {
  constructor(image, silhouette, id){
    this.image = image;
    this.silhouette = silhouette;
    this.id = id;
  }
  // test method
  setLocation(xCoordinate, yCoordinate){
    this.image.setPosition(xCoordinate, yCoordinate);
  }
  // return the silhouette linked to this sticker
  getSilhouette(){
    return this.silhouette;
  }
  // get the sticker's id
  getID(){
    return this.id;
  }
  // change the silhouette attached to this sticker
  setSilhouette(silhouette){
    this.silhouette = silhouette;
  }
}
export default Sticker