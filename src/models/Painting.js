import * as Phaser from 'phaser'
import CONFIG from '../config.js'
import Sticker from './Sticker.js'
import Silhouette from './Silhouette.js'

class Painting {
  /**
   * constructs the Painting object while placing the painting size stickers, finding where the visible
   *  part is, replacing that image with the sticker's images, and placing the silhouettes
   * @param {String} img
   * the image object for the painting itself
   * @param {String[]} stickerKeys
   * the keys of the large, transparent versions of the stickers hidden in the painting
   * remember to define with: new Array('key1', 'key2', 'key3')
   * @param {Silhouette[]} silhouettes
   * the silhouette objects in large, transparent image form for ease of placement
   * @param {Phaser.Scene} scene
   * the scene that all of the Phaser.GameObjects.Image were created on (usually 'this')
   */
  constructor (img, stickerKeys, silhouettes, scene) {
    console.log('called painting constructor')
    // save members
    this.img = scene.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, img)
    this.stickers = []
    this.stickerKeys = stickerKeys
    this.silhouettes = []
    this.silhouetteKeys = silhouettes

    // Scaling every painting to fix into the frame without messing with the aspect ratio.
    const targetWidth = 1920 - 160
    const widthScale = targetWidth / scene.textures.getFrame(img).width

    const targetHeight = 1080 - 160
    const heightScale = targetHeight / scene.textures.getFrame(img).height

    this.targetScale = widthScale < heightScale ? widthScale : heightScale
    this.img.setScale(this.targetScale)

    console.log('silhouettes:' + this.silhouetteKeys)
    // place silhouettes
    if (silhouettes != null) {
      for (let i = 0; i < silhouettes.length; i++) {
        // get a bound of a sticker
        console.log('Searching pixels of key: ', silhouettes[i])
        const bounds = this.findSticker(scene.textures, silhouettes[i])

        console.log(bounds)

        console.log('sticker texture height', scene.textures.getFrame(silhouettes[i]).height)

        // create an image on the scene for this sticker key
        const silhouettesImage = scene.add.image(0, 0, silhouettes[i]).setScale(this.targetScale)
        // crop to just around the visible parts; unclear whether this matters
        silhouettesImage.setCrop(
          bounds.leftBound,
          bounds.topBound,
          bounds.rightBound - bounds.leftBound,
          bounds.bottomBound - bounds.topBound
        )
        silhouettesImage.setDepth(7)
        // create a Sticker around this sticker
        const silhouette = new Silhouette(silhouettesImage, null, 0)
        silhouette.bounds = bounds
        // add the Sticker to this.stickers
        this.silhouettes.push(silhouette)
        // set position of the cropped sticker
        silhouettesImage.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2)
        console.log(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2)

        const paintingLoc = new Phaser.Math.Vector2(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2)
        console.log(paintingLoc)
        const paintingTopLeft = paintingLoc.subtract(new Phaser.Math.Vector2((this.img.width / 2.0) * this.targetScale, (this.img.height / 2.0) * this.targetScale))
        console.log(paintingTopLeft)
        const relativeStickerCenter = new Phaser.Math.Vector2(((bounds.leftBound + bounds.rightBound) / 2.0) * this.targetScale, ((bounds.topBound + bounds.bottomBound) / 2.0) * this.targetScale)
        console.log(relativeStickerCenter)
        const silhouetteGameOrigin = paintingTopLeft.add(relativeStickerCenter)
        // set real position
        console.log(silhouetteGameOrigin)
        silhouette.gameOrigin = silhouetteGameOrigin
        silhouette.offset = new Phaser.Math.Vector2(silhouette.image.x + 50, silhouette.image.y - 25).subtract(silhouette.gameOrigin)
      }
    } else {
      console.log('passed silhouettes is not a Silhouette')
    }

    //TODO point stickers at associated silhouette

    // find the bounds for all stickers
    console.log('about to loop over stickers...')
    console.log('stickers' + this.stickerKeys)
    if (this.stickerKeys != null) {
      for (let i = 0; i < this.stickerKeys.length; i++) {
        // get a bound of a sticker
        console.log('Searching pixels of key: ', stickerKeys[i])
        const bounds = this.findSticker(scene.textures, stickerKeys[i])

        console.log(bounds)

        console.log('sticker texture height', scene.textures.getFrame(stickerKeys[i]).height)

        // create an image on the scene for this sticker key
        const stickerImage = scene.add.image(0, 0, stickerKeys[i]).setInteractive().setScale(this.targetScale)
        // crop to just around the visible parts; unclear whether this matters
        stickerImage.setCrop(
          bounds.leftBound,
          bounds.topBound,
          bounds.rightBound - bounds.leftBound,
          bounds.bottomBound - bounds.topBound
        )
        stickerImage.setDepth(5)

        // create a new hitArea for clicking interaction; the real fix
        stickerImage.input.hitArea = new Phaser.Geom.Rectangle(
          bounds.leftBound,
          bounds.topBound,
          bounds.rightBound - bounds.leftBound,
          bounds.bottomBound - bounds.topBound
        )
        // create a Sticker around this sticker
        const sticker = new Sticker(stickerImage, null, 0)
        // set bounds on sticker object for tut use
        sticker.bounds = bounds
        sticker.realScale.x = bounds.rightBound - bounds.leftBound
        sticker.realScale.y = bounds.bottomBound - bounds.topBound
        // add the Sticker to this.stickers
        this.stickers.push(sticker)
        // set position of the cropped sticker
        stickerImage.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2)
        // try setting origin so particles spawn on the sticker
        // haha linear algebra jumpscare
        const paintingLoc = new Phaser.Math.Vector2(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2)
        console.log(paintingLoc)
        const paintingTopLeft = paintingLoc.subtract(new Phaser.Math.Vector2((this.img.width / 2.0) * this.targetScale, (this.img.height / 2.0) * this.targetScale))
        console.log(paintingTopLeft)
        const relativeStickerCenter = new Phaser.Math.Vector2(((bounds.leftBound + bounds.rightBound) / 2.0) * this.targetScale, ((bounds.topBound + bounds.bottomBound) / 2.0) * this.targetScale)
        console.log(relativeStickerCenter)
        const stickerGameOrigin = paintingTopLeft.add(relativeStickerCenter)
        // set real position
        console.log(stickerGameOrigin)
        sticker.gameOrigin = stickerGameOrigin
        // sticker.offset = (sticker.image.position - sticker.gameOrigin)
        sticker.offset = new Phaser.Math.Vector2(sticker.image.x + 50, sticker.image.y - 25).subtract(sticker.gameOrigin)

        // loops through the rest
      }
    }
    this.setPosition(-5000, 0)

    console.log('painting constructor finished')
  }

  getPixels (textures, key) {
    const textureFrame = textures.getFrame(key)

    // based on https://github.com/phaserjs/phaser/blob/master/src/textures/TextureManager.js
    const cd = textureFrame.canvasData

    const canvas = Phaser.Display.Canvas.CanvasPool.create2D(this, cd.width, cd.height)
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (cd.width > 0 && cd.height > 0) {
      ctx.drawImage(
        textureFrame.source.image,
        cd.x,
        cd.y,
        cd.width,
        cd.height,
        0,
        0,
        cd.width,
        cd.height
      )
    }

    const imgData = ctx.getImageData(0, 0, cd.width, cd.height)

    Phaser.Display.Canvas.CanvasPool.remove(canvas)

    // return object that encapsulates efficiently querying the image data
    return {
      get: function (x, y) {
        // image data is packed into an array with groups of 4 elements representing each RGBA pixel
        const start = 4 * (y * cd.width + x)
        if (x < cd.width && y < cd.height) {
          // use a simple JSON object rather than Phaser.Display.Color for performance
          return {
            red: imgData.data[start],
            green: imgData.data[start + 1],
            blue: imgData.data[start + 2],
            alpha: imgData.data[start + 3]
          }
        } else {
          // match behavior of Phaser's getPixel() function and return null if out of bounds
          return null
        }
      }
    }
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
    console.log('searching for ' + key)
    console.log(textures.get(key))

    // step distance; change to balance speed and accuracy
    const STEP = 4
    // make temp variables to take max/min for each coordinate
    // min needs to be big number so it gets updated correctly
    let minX = 1000000
    let maxX = 0
    let minY = 1000000
    let maxY = 0

    // create variables to increment as loop and end condition
    let x = 1
    let y = 1
    let boundsFound = false

    const pixelData = this.getPixels(textures, key)

    const texData = textures.getBase64(key)

    // store result of pixel Alpha
    let result = pixelData.get(x, y)
    // end condition is when a new row is started and comes back as null
    // (result == null && x == 1) inverse for loop condition
    while (result !== null || x !== 1) {
      if (result == null) {
        // move to next row
        y += STEP
        x = 1
      } else {
        // check if alpha is 0
        if (result.alpha !== 0) {
          if (!boundsFound) {
            // set all mins/maxes to pixel coords
            minX = x
            maxX = x
            minY = y
            maxY = y
            // update boundsFound to true
            boundsFound = true
          } else {
            // compare against mins/maxes
            if (x < minX) {
              minX = x
            } else if (x > maxX) {
              // else if so only checks when the min is not updated
              maxX = x
            }
            if (y < minY) {
              minY = y
            } else if (y > maxY) {
              maxY = y
            }
          }
        }

        // move to next column
        x += STEP
      }

      // get next pixel
      result = pixelData.get(x, y)
    }
    // check if bounds were found
    if (!boundsFound) {
      return null
    }

    // returned in a struct object
    const bounds = {
      leftBound: minX,
      rightBound: maxX,
      topBound: minY,
      bottomBound: maxY
    }
    return bounds
  }

  /**
   * triggers sticker to be removed from the image.
   * will likely trigger animation and the like.
   * For now, simply destroys the sticker
   * sets the index to null so that the other indeces are consistent with level build
   * @param {Sticker} stickerToRemove
   */
  removeSticker (stickerToRemove) {
    // check if in array; -1 if not in array
    const removeIndex = this.stickers.indexOf(stickerToRemove)
    if (removeIndex !== -1) {
      console.log('Removing sticker from painting')
      this.stickers[removeIndex] = null
    } else {
      console.log('Sticker not found in painting')
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
    // get the difference in each coordinate
    const xDifference = x - this.img.x
    const yDifference = y - this.img.y
    // add the difference to each object
    // painting
    this.img.setPosition(x, y)

    // stickers; accounts for clicked stickers being null
    for (let i = 0; i < this.stickers.length; i++) {
      if (this.stickers[i] != null) {
        const imageX = this.stickers[i].image.x
        const imageY = this.stickers[i].image.y
        this.stickers[i].image.setPosition(imageX + xDifference, imageY + yDifference)
      }
    }
    // silhouettes
    for (const silhouette of this.silhouettes) {
      const imageX = silhouette.image.x
      const imageY = silhouette.image.y
      silhouette.image.setPosition(imageX + xDifference, imageY + yDifference)
    }
    // frame?

    // done. that easy
  }

  getWidth () {
    return this.img.width * this.targetScale
  }
}

export default Painting
