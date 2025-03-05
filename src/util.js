
class Util {
  /**
   * use to handle 'pointerdown' events on the sticker object passed.
   * the silhouette object should be where to move it to
   * the pointer gets automatically passed to the event function, so when the function is added
   * it should be declared inline and call this function with the appropriate variables
   * @param {Phaser.Input.Pointer} pointer 
   * @param {Phaser.image} sticker 
   * @param {Phaser.image} silhouette 
   */
  static handlePointerDown (pointer, sticker, silhouette) {
    //clicking... probably
    console.log('clicked!')
    //move the image to RedBox
    console.log(silhouette.x, silhouette.y)
    sticker.setPosition(silhouette.x, silhouette.y+17)
  }

  /**
   * loops through the pixels in the given texture (found by the key string) and returns all
   *  bounds where pixels have alpha values, getting those values from the Frame passed
   * @param {Phaser.Textures.Frame} frame 
   *  gotten from scene.textures.getFrame(key) where key is the string key of your image
   */
  static findSticker (textures, key) {
    //loop through all or most pixels and find the left, right, top, and bottom bounds
    //make temp variables to take max/min for each coordinate
    let min_x = 0, max_x = 0, min_y = 0, max_y = 0
    //loop through pixels on const STEP to find rough maxes/mins
    // use 
    

    //returned in a struct object
    let bounds = {
      leftBound: min_x,
      rightBound: max_x,
      topBound: min_y,
      BottomBound: max_y
    }
    return Bounds;
  }


}

export default Util