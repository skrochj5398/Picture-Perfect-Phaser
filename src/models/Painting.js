import CONFIG from '../config.js'
import Sticker from './Sticker.js'

class Painting {

  /**
   * constructs the Painting object while placing the painting size stickers, finding where the visible
   *  part is, replacing that image with the sticker's images, and placing the silhouettes
   * @param {Phaser.GameObjects.Image} img 
   * the image object for the painting itself
   * @param {Sticker[]} stickers 
   * the stickers that are to be hidden on this painting (in corresponding order with 
   *  stickersPaintingSize)
   * @param {String[]} stickerKeys
   * the keys of the large, transparent versions of the stickers hidden in the painting (in 
   *  corresponding order with stickers)
   * remember to define with: new Array('key1', 'key2', 'key3')
   * @param {Silhouette[]} silhouettes 
   * the silhouette objects in large, transparent image form for ease of placement
   * @param {Phaser.Scene} scene
   * the scene that all of the Phaser.GameObjects.Image were created on (usually 'this')
   */
	constructor(img, stickers, stickerKeys, silhouettes, scene) {
    console.log("called painting constructor")
    //save members
		this.img = img
    this.stickers = stickers
    this.stickerKeys = stickerKeys
    this.silhouettes = silhouettes

    //place the painting image, the painting-size-stickers, and silhouettes
    //place the painting
    if (this.img instanceof Phaser.GameObjects.Image) {
      this.img.setPosition(CONFIG.DEFAULT_WIDTH / 2.02, CONFIG.DEFAULT_HEIGHT / 2.06)
    } else {
      console.log('passed img is not a Phaser.GameObjects.Image')
    }
    //check the stickers input
    if (!(this.stickers instanceof Sticker)) {
      console.log('passed stickers is not a Sticker')
    }
    //place painting-size-stickers
    //actually don't. we can find their sticker location without moving them
    if (!(stickerKeys instanceof String)) {
      console.log('passed stickersPaintingSize is not a String')
    }
    //place silhouettes TODO uncomment when Silhouette is added
    /*if (silhouettes instanceof Silhouette) {
      for (const silhouette of this.silhouettes) {
        silhouette.getImg().setPosition(CONFIG.DEFAULT_WIDTH / 2.02, CONFIG.DEFAULT_HEIGHT / 2.06)
        //TODO update to change silhouette image position once Silhouette is defined
      }
    } else {
      console.log('passed silhouettes is not a Silhouette')
    }*/
   
    //find the bounds for all stickers
    console.log('about to loop over stickers...')
    for (let i = 0; i < this.stickerKeys.length; i++) {
      //get a bound of a sticker
      console.log('Searching pixels of key: ', stickerKeys[i])
      const bounds = this.findSticker(scene.textures, stickerKeys[i])
      console.log(bounds)

      // create an image on the scene for this sticker key
      let cropSticker = scene.add.image(0,0,stickerKeys[i])
      // crop to just around the bounds
      // cropSticker.setCrop(
      //   bounds.leftBound, 
      //   bounds.topBound,
      //   bounds.rightBound-bounds.leftBound,
      //   bounds.bottomBound-bounds.topBound
      // )
      cropSticker.setCrop(
        bounds.leftBound, 
        bounds.topBound,
        bounds.rightBound - bounds.leftBound,
        bounds.bottomBound - bounds.topBound
      )
      // set postition of the cropped sticker
      cropSticker.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)

      //access corresponding sticker
      const sticker = this.stickers[i]

      //calculate position
      // assuming painting is centered, get painting's offset from origin
      const heightOffset = (CONFIG.DEFAULT_HEIGHT - this.img.height) / 2.0
      const widthOffset = (CONFIG.DEFAULT_WIDTH - this.img.width) / 2.0
      console.log('painting offset found to be: ', widthOffset, ' ', heightOffset)
      // get sticker origin by averaging bounds
      const stickerBoundsX = (bounds.leftBound + bounds.rightBound) / 2.0
      const stickerBoundsY = (bounds.topBound + bounds.bottomBound) / 2.0
      console.log('sticker origin found at: ', stickerBoundsX, ' ', stickerBoundsY)
      // add offset to get final positioning of sticker origin
      const finalX = stickerBoundsX + widthOffset
      const finalY = stickerBoundsY + heightOffset
      //save somewhere... or use immediately
      console.log('setting sticker to location: ', finalX, ' ', finalY)
      sticker.setLocation(sticker, finalX, finalY)

      //loops through the rest
    }


    console.log('painting constructor finished')
	}


	
	/**
   * loops through the pixels in the given texture (found by the key string) and returns all
   *  bounds where pixels have alpha values, getting those values from the Frame passed
   * returns null if no nontransparent pixels are found
   * @param {Phaser.Textures.TextureManager} textures 
   * gotten from this.textures on a phaser texture object or one that inherits from it (like Scene)
   * @param {string} key
   * the key is the string identifier given to a Phaser.Image object when it is created
   */
  findSticker (textures, key) {
    //step distance; change to balance speed and accuracy
    const STEP = 4
    //make temp variables to take max/min for each coordinate
    // min needs to be big number so it gets updated correctly
    let min_x = 1000000, max_x = 0, min_y = 1000000, max_y = 0
    //create variables to incremetn as loop and end condition
    let x = 1, y = 1, run = true, boundsFound = false
    //store result of pixel Alpha
    let result = textures.getPixel(x,y, key);
    //end condition is when a new row is started and comes back as null
    // (result == null && x == 1) inverse for loop condition
    while (result != null || x != 1) {
      if (result == null) {
         //move to next row
         y += STEP
         x = 1
      } else {
        //check if alpha is 0
        if (result.alpha != 0) {
          if (!boundsFound) {
            //set all mins/maxes to pixel coords
            min_x = x
            max_x = x
            min_y = y
            max_y = y
            //update boundsFound to true
            boundsFound = true
          } else {
            //compare against mins/maxes
            if (x < min_x) {
              min_x = x
            } else if (x > max_x) {
              //else if so only checks when the min is not updated
              max_x = x
            }
            if (y < min_y) {
              min_y = y
            } else if (y > max_y) {
              max_y = y
            }
          }
        }

        //move to next column
        x += STEP
      }
      //get next pixel
      result = textures.getPixel(x,y, key);
    }
    // check if bounds were found
    if (!boundsFound) {
      return null;
    }

    //returned in a struct object
    let bounds = {
      leftBound: min_x,
      rightBound: max_x,
      topBound: min_y,
      bottomBound: max_y
    }
    return bounds;
  }

  /**
   * triggers sticker to be removed from the image. 
   * will likely trigger animation and the like.
   * For now, simply destroys the sticker
   * @param {Sticker} stickerToRemove 
   */
  removeSticker (stickerToRemove) {
    //check if in array; -1 if not in array
    const removeIndex = this.stickers.indexOf(stickerToRemove)
    if (removeIndex != -1) {
      console.log("Removing sticker from painting")
      this.stickers.splice(removeIndex, 1)
    } else {
      console.log("Sticker not found in painting")
    }
  }
}

export default Painting