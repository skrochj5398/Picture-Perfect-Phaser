import Phaser from 'phaser'

class Slider extends Phaser.GameObjects.Image {
  constructor (scene, x, y, handleTexture, barTexture, barWidth, barHeight, fillTexture, min, max, dragFunction) {
    // construct object
    super(scene, x, y, handleTexture)
    this.barWidth = barWidth
    this.barHeight = barHeight
    this.bounds = barWidth / 2
    this.min = min
    this.max = max
    this.value = (max + min) / 2
    this.dragFunction = dragFunction

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
      // set x width for fill
      this.fill.width = distanceToHandle
      const newXPos = distanceToHandle / 2 + leftBound
      // set position so fill starts at left side of bar
      this.fill.setPosition(newXPos, this.fill.y)
      // set value... but mafs first
      const totalDistance = x + this.bounds - leftBound
      const fillPercent = distanceToHandle / totalDistance
      console.log(fillPercent)
      // set value
      this.value = (max - min) * fillPercent + min
      console.log(this.value)
    })
    // add personalized function
    this.on('drag', this.dragFunction)
    // make in front of everything else (bar should be 10)
    this.setDepth(12)

    // create bar
    this.bar = scene.add.image(x, y, barTexture)
    // set depth
    this.bar.setDepth(10)
    // change scale to match width and height
    this.bar.setScale(
      barWidth / scene.textures.getFrame(barTexture).width,
      barHeight / scene.textures.getFrame(barTexture).height
    )

    // create fill
    this.fill = scene.add.nineslice(x, y, fillTexture, 0, scene.textures.getFrame(fillTexture).width, scene.textures.getFrame(fillTexture).height, 15, 15, 0, 0)
    // set depth 11
    this.fill.setDepth(11)
    // change scale and position to match starting position
    const leftBound = x - this.bounds
    const distanceToHandle = this.x - leftBound
    this.fill.width = distanceToHandle
    const newXPos = distanceToHandle / 2 + leftBound
    this.fill.setPosition(newXPos, this.fill.y)
  }

  setActive (isActive) {
    super.setActive(isActive)
    this.bar.setActive(isActive)
    this.fill.setActive(isActive)
    return this
  }

  setVisible (isVisible) {
    super.setVisible(isVisible)
    this.bar.setVisible(isVisible)
    this.fill.setVisible(isVisible)
    return this
  }
}

export default Slider
