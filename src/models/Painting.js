import CONFIG from '../config.js'
import Sticker from './Sticker.js'
import Silhouette from './Silhouette.js'

class Painting {

  /**
   * constructs the Painting object while placing the painting size stickers, finding where the visible
   *  part is, replacing that image with the sticker's images, and placing the silhouettes
   * @param {Phaser.GameObjects.Image} img 
   * the image object for the painting itself
   * @param {String[]} stickerKeys
   * the keys of the large, transparent versions of the stickers hidden in the painting
   * remember to define with: new Array('key1', 'key2', 'key3')
   * @param {Silhouette[]} silhouettes 
   * the silhouette objects in large, transparent image form for ease of placement
   * @param {Phaser.Scene} scene
   * the scene that all of the Phaser.GameObjects.Image were created on (usually 'this')
   */
	constructor(img, stickerKeys, silhouettes, scene) {
    console.log("called painting constructor")
    //save members
		this.img = img
    this.stickers = new Array()
    this.stickerKeys = stickerKeys
    this.silhouettes = silhouettes

    //place the painting image, the painting-size-stickers, and silhouettes
    //place the painting
    if (this.img instanceof Phaser.GameObjects.Image) {
      this.img.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)
      this.img.setScale(0.417)
    } else {
      console.log('passed img is not a Phaser.GameObjects.Image')
    }
    //place silhouettes
    if (silhouettes instanceof Array && silhouettes[0] instanceof Silhouette) {
      for (const silhouette of this.silhouettes) {
        silhouette.image.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)
      }
    } else {
      console.log('passed silhouettes is not a Silhouette')
    }
   
    //find the bounds for all stickers
    console.log('about to loop over stickers...')
    if (this.stickerKeys != null) {
      for (let i = 0; i < this.stickerKeys.length; i++) {
        //get a bound of a sticker
        console.log('Searching pixels of key: ', stickerKeys[i])
        const bounds = this.findSticker(scene.textures, stickerKeys[i])
        console.log(bounds)

        // create an image on the scene for this sticker key
        let stickerImage = scene.add.image(0,0,stickerKeys[i]).setInteractive()
        //crop to just around the visible parts
        stickerImage.setCrop(
          bounds.leftBound, 
          bounds.topBound,
          bounds.rightBound - bounds.leftBound,
          bounds.bottomBound - bounds.topBound
        )
        //create a new hitArea for clicking interaction
        stickerImage.input.hitArea = new Phaser.Geom.Rectangle(
          bounds.leftBound, 
          bounds.topBound, 
          bounds.rightBound - bounds.leftBound,
          bounds.bottomBound - bounds.topBound
        )
        // create a Sticker around this sticker
        const sticker = new Sticker(stickerImage, null, 0)
        // add the Sticker to this.stickers
        this.stickers.push(sticker)
        // set postition of the cropped sticker
        stickerImage.setPosition(CONFIG.DEFAULT_WIDTH / 2.02, CONFIG.DEFAULT_HEIGHT / 2.06)

        //loops through the rest
      }
    }
    this.setPosition(-5000, 0)

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
   * sets the index to null so that the other indeces are consistent with level build
   * @param {Sticker} stickerToRemove 
   */
  removeSticker (stickerToRemove) {
    //check if in array; -1 if not in array
    const removeIndex = this.stickers.indexOf(stickerToRemove)
    if (removeIndex != -1) {
      console.log("Removing sticker from painting")
      this.stickers[removeIndex] = null
    } else {
      console.log("Sticker not found in painting")
    }
  }

  /**
   * moves the painging and all objects attached to it
   * @param {number} x 
   *  x position of where to put the painting
   * @param {number} y
   *  y position of where to put the painting
   */
  setPosition (x, y) {
    //get the difference in each coordinate
    let xDifference = x - this.img.x
    let yDifference = y - this.img.y
    //add the difference to each object
    // painting
    this.img.setPosition(this.img.x + xDifference, this.img.y + yDifference)
    // stickers; accounts for clicked stickers being null
    for (let i = 0; i < this.stickers.length; i++) {
      if (this.stickers[i] != null) {
        let imageX = this.stickers[i].image.x
        let imageY = this.stickers[i].image.y
        this.stickers[i].image.setPosition(imageX + xDifference, imageY + yDifference)
      }
    }
    // silhouettes
    for (let silhouette of this.silhouettes) {
      let imageX = silhouette.image.x
      let imageY = silhouette.image.y
      silhouette.image.setPosition(imageX + xDifference, imageY + yDifference)
    }
    // frame?
    
    //done. that easy
  }
}

export default Painting