
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
   * 
   * @param {*} scene 
   * @param {*} key 
   */
  static findSticker (scene, key) {
    scene.textures.getPixel(1,1,key)
  }


}

export default Util