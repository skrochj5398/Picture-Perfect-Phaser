

class Painting {

	Painting(img) {
		this.img = img
	}


	
	/**
   * loops through the pixels in the given texture (found by the key string) and returns all
   *  bounds where pixels have alpha values, getting those values from the Frame passed
   * returns null if no nontransparent pixels are found
   * @param {Phaser.Textures.TextureManager} textures 
   * gotten from this.textures on a phaser texture object or one that inherits from it
   * @param {string} key
   * the key is the string identifier given to a Phaser.Image object when it is created
   */
  static findSticker (textures, key) {
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
      BottomBound: max_y
    }
    return bounds;
  }


}