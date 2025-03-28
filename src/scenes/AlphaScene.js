import Phaser from 'phaser'
import CONFIG from '../config.js'
import Painting from '../models/Painting.js'
import Silhouette from '../models/Silhouette.js'

class AlphaScene extends Phaser.Scene {

  preload () {
    //this is where to load images or in StartScene
    // temp images for left and right buttons
    this.load.image('BlueBox', 'assets/BlueBox.png')
    this.load.image('RedBox', 'assets/RedBox.png')

    // paintings
    this.load.image(
      'Painting1', 
      'assets/Levels/Level3/Painting1/the_last_of_the_buffalo_2014.79.5.jpg'
    )
    this.load.image(
      'Painting2', 
      'assets/Levels/Level3/Painting2/joshua_commanding_the_sun_to_stand_still_upon_gibeon_2004.64.1.jpg'
    )
    this.load.image(
      'Painting3', 
      'assets/Levels/Level3/Painting3/wivenhoe_park,_essex_1942.9.10.jpg'
    )
    this.load.image(
      'Painting4', 
      'assets/Levels/Level3/Painting4/the_voyage_of_life__youth_1971.16.2.jpg'
    )

    // stickers and silhouettes for each painting (this'll get long)
    //  Painting1
    this.load.image(
      'Painting1Silhouette1', 
      'assets/Levels/Level3/Painting1/Buffalo Negative.png'
    )
    this.load.image(
      'Painting1Silhouette2', 
      'assets/Levels/Level3/Painting1/Skull Negative.png'
    )
    this.load.image(
      'Painting1Sticker1', 
      'assets/Levels/Level3/Painting1/Soldier Sticker.png'
    )
    // Painting2
    this.load.image(
      'Painting2Sticker1', 
      'assets/Levels/Level3/Painting2/Angel Sticker.png'
    )
    this.load.image(
      'Painting2Silhouette1', 
      'assets/Levels/Level3/Painting2/Charging Soldier Negative.png'
    )
    this.load.image(
      'Painting2Silhouette2', 
      'assets/Levels/Level3/Painting2/Soldier Negative.png'
    )
    // Painting3
    this.load.image(
      'Painting3Silhouette1', 
      'assets/Levels/Level3/Painting3/Boat Negative.png'
    )
    this.load.image(
      'Painting3Sticker1', 
      'assets/Levels/Level3/Painting3/Buffalo Sticker.png'
    )
    this.load.image(
      'Painting3Sticker2', 
      'assets/Levels/Level3/Painting3/Charging Soldier Sticker.png'
    )
    this.load.image(
      'Painting3Silhouette2', 
      'assets/Levels/Level3/Painting3/Cow Negative.png'
    )
    // Painting4
    this.load.image(
      'Painting4Silhouette1', 
      'assets/Levels/Level3/Painting4/Angel Negative.png'
    )
    this.load.image(
      'Painting4Sticker1', 
      'assets/Levels/Level3/Painting4/Boat Sticker.png'
    )
    this.load.image(
      'Painting4Sticker2', 
      'assets/Levels/Level3/Painting4/Cow Sticker.png'
    )
    this.load.image(
      'Painting4Sticker3', 
      'assets/Levels/Level3/Painting4/Skull Sticker.png'
    )

    // inventory & frame
    this.load.image('Inventory', 'assets/Picture_Perfect_Inventory_3Slot_S_Claire.png')
    this.load.image('Frame', 'assets/Picture perfect- Frame.png')
  }


  create () {
    // create the painting so they are under the frame
    const tempPainting1 = this.add.image(0, 0, 'Painting1')
    const tempPainting2 = this.add.image(0, 0, 'Painting2')
    const tempPainting3 = this.add.image(0, 0, 'Painting3')
    const tempPainting4 = this.add.image(0, 0, 'Painting4')

    const Frame = this.add.nineslice(
      CONFIG.DEFAULT_WIDTH / 1.98, 
      CONFIG.DEFAULT_HEIGHT / 1.96, 
      'Frame', 
      0, 1920, 1080, 32, 32, 32, 32
    )
    const inventory = this.add.image(1000, 1010, 'Inventory').setScale(.5)

    // pass silhouettes too, in an array of Silhouettes with ids concat(painting#, silhouette#)
    // define after Frame so frame doesn't block click events (must more blood be shed!?)
    const painting1 = new Painting(
      tempPainting1, 
      new Array('Painting1Sticker1'), 
      new Array(
        new Silhouette(this.add.image(0,0,"Painting1Silhouette1"), null, 11),
        new Silhouette(this.add.image(0,0,"Painting1Silhouette2"), null, 12)
      ), 
      this
    )
    const painting2 = new Painting(
      tempPainting2, 
      new Array('Painting2Sticker1'), 
      new Array(
        new Silhouette(this.add.image(0,0,'Painting2Silhouette1'), null, 21),
        new Silhouette(this.add.image(0,0,'Painting2Silhouette2'), null, 22)
      ), 
      this
    )
    const painting3 = new Painting(
      tempPainting3, 
      new Array('Painting3Sticker1', 'Painting3Sticker2'), 
      new Array(
        new Silhouette(this.add.image(0,0,'Painting3Silhouette1'), null, 31),
        new Silhouette(this.add.image(0,0,'Painting3Silhouette2'), null, 32)
      ), 
      this
    )
    const painting4 = new Painting(
      tempPainting4, 
      new Array('Painting4Sticker1', 'Painting4Sticker2', 'Painting4Sticker3'), 
      new Array(
        new Silhouette(this.add.image(0,0,'Painting4Silhouette1'), null, 41)
      ), 
      this
    )

    // load the paintings into an array
    this.paintings = new Array(painting1, painting2, painting3, painting4)

    // attach a function to a sticker; should attach all of them
    console.log('about to attach click function')
    for (let painting of this.paintings) {
      for (let i = 0; i < painting.stickers.length; i++) {
        console.log('attaching event to sticker ', i)
        painting.stickers[i].image.on('pointerdown', () => {this.handleTestStickerPointerDown(i)})
      }
    }
    
    //set first painting and position it
    this.currentPainting = this.paintings[0]
    this.currentPainting.setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)

    // attach functions to move up or down the array
    this.blueBox = this.add.image(10, CONFIG.DEFAULT_HEIGHT / 2, 'BlueBox').setInteractive()
    this.redBox = this.add.image(CONFIG.DEFAULT_WIDTH - 10, CONFIG.DEFAULT_HEIGHT / 2, 'RedBox').setInteractive()
    this.blueBox.on('pointerdown', () => {this.lastPainting()})
    this.redBox.on('pointerdown', () => {this.nextPainting()})
  }

  handleTestStickerPointerDown (index) {
    console.log("running click function")
    this.currentPainting.stickers[index].image.setPosition(-5000, 0)
    this.currentPainting.removeSticker(this.currentPainting.stickers[index])
  } 

  nextPainting () {
    //move the current painting offscreen
    this.currentPainting.setPosition(-3000,-3000)
    //get the next index of the paintings Array
    let nextIndex = this.paintings.indexOf(this.currentPainting) + 1
    //check if nextIndex is past the end
    if (nextIndex >= this.paintings.length) {
      //reset back to the start
      console.log("looping paintings")
      nextIndex = 0
    }
    //change current painting to that one
    // change new paintings position to center of screen TODO update when frames are fixed
    this.paintings[nextIndex].setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)
    // change this.currentPainting
    this.currentPainting = this.paintings[nextIndex]
  }

  lastPainting () {
    //move the current painting offscreen
    this.currentPainting.setPosition(-3000,-3000)
    //get the last index of the paintings Array
    let lastIndex = this.paintings.indexOf(this.currentPainting) - 1
    //check if lastIndex is past the end
    if (lastIndex < 0) {
      //reset back to the end
      console.log("looping paintings backwards")
      lastIndex = this.paintings.length - 1
    }
    //change current painting to that one
    // change new paintings position to center of screen TODO update when frames are fixed
    this.paintings[lastIndex].setPosition(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2.06)
    // change this.currentPainting
    this.currentPainting = this.paintings[lastIndex]
  }

}

export default AlphaScene