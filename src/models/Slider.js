import Phaser from 'phaser'

class Slider extends Phaser.GameObjects.Image {
  constructor (scene, x, y, handleTexture, barTexture, barWidth, barHeight, fillTexture, min, max) {
    // construct object
    super(scene, x, y, handleTexture)
    this.barWidth = barWidth
    this.barHeight = barHeight
    this.bounds = barWidth / 2
    this.min = min
    this.max = max
    this.value = (max + min) / 2

    // add to scene
    scene.add.existing(this)
    // make handle draggable
    this.setInteractive({ draggable: true })
    // add drag function
    this.on('drag', (pointer, dragX, dragY) => {
      // move handle
      this.setPosition(Math.min(Math.max(dragX, x - this.bounds), x + this.bounds), this.y)
      // mafs
      const leftBound = x - this.bounds
      const distanceToHandle = this.x - leftBound
      const fillScale = distanceToHandle / scene.textures.getFrame(fillTexture).width
      // set x scale for fill
      fill.setScale(fillScale, 1)
      const newXPos = distanceToHandle / 2 + leftBound
      // set position so fill starts at left side of bar
      fill.setPosition(newXPos, fill.y)
      // set value... but mafs first
      const totalDistance = x + this.bounds - leftBound
      const fillPercent = distanceToHandle / totalDistance
      console.log(fillPercent)
      // set value
      this.value = (max - min) * fillPercent + min
      console.log(this.value)
    })
    console.log(x + this.bounds)
    // make in front of everything else (bar should be 10)
    this.setDepth(12)

    // create bar
    const bar = scene.add.image(x, y, barTexture)
    // set depth
    bar.setDepth(10)
    // change scale to match width and height
    bar.setScale(
      barWidth / scene.textures.getFrame(barTexture).width,
      barHeight / scene.textures.getFrame(barTexture).height
    )

    // create fill
    const fill = scene.add.image(x, y, fillTexture)
    // set depth 11
    fill.setDepth(11)
    // change scale and position to match starting position
    const leftBound = x - this.bounds
    const distanceToHandle = this.x - leftBound
    const fillScale = distanceToHandle / scene.textures.getFrame(fillTexture).width
    fill.setScale(fillScale, 1)
    const newXPos = distanceToHandle / 2 + leftBound
    fill.setPosition(newXPos, fill.y)
  }
}

export default Slider
