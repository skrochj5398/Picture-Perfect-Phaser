import CONFIG from '../config.js'
import Phaser from 'phaser'

/**
 * a class that is a Phaser.GameObjects.Image as a button with different textures when hovering
 * and a function that executes when clicked
 */
class HoverableButton extends Phaser.GameObjects.Image {
  /**
   * creates the HoverableButton as a Phaser.GameObjects.Image with the following parameters, a
   *  different texture when hovering, and a function that executes when clicked.
   *  Handles adding itself to the scene as well.
   * @param {Phaser.Scene} scene
   *  the scene the image is added to
   * @param {number} x
   *  x coordinate
   * @param {number} y
   *  y coordinate
   * @param {Phaser.Textures.Texture | string} texture
   *  the texture object or string key referencing a texture object. Used when hovered over
   * @param {function} clickFunction
   *  a function that executes when this object is clicked
   */
  constructor (scene, x, y, texture, clickFunction) {
    // call Phaser.GameObjects.Image; must do first
    super(scene, x, y, texture)
    scene.add.existing(this)
    this.setInteractive()
    // set default tint
    this.setTint(0xeeeeee)

    // save variables for event listeners
    this.unHoverTexture = texture
    this.clickFunction = clickFunction

    // add event listeners
    this.on('pointermove', () => { this.onPointerMove() })
    this.on('pointerout', () => { this.onPointerOut() })
    this.on('pointerup', () => { this.clickFunction() })
    this.on('pointerup', () => { this.onPointerUp() })
    this.on('pointerdown', () => { this.onPointerDown() })
  }

  /**
   * handles tinting when pointer hovers over this object
   */
  onPointerMove () {
    this.setTint(0xffffff)
  }

  /**
   * handles tinting when pointer stops hovering over this object
   */
  onPointerOut () {
    this.setTint(0xeeeeee)
  }

  /**
   * handles tinting when pointer is pressed down on this object
   */
  onPointerDown () {
    this.setTint(0xaaaaaa)
  }

  /**
   * handles tinting back to hover after clicking
   */
  onPointerUp () {
    this.setTint(0xffffff)
  }
}

export default HoverableButton
