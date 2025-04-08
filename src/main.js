// Bring in the phaser library
import Phaser from 'phaser'

import CONFIG from './config.js'

// Bringing in our base example scene
import ExampleScene from './scenes/Example.js'
import StartScene from './scenes/Start.js'
import HUDScene from './scenes/HUD.js'
import PrototypeScene from './scenes/Prototype.js'
import JessieTestScene from './scenes/JessieTestScene.js'
import AlphaScene from './scenes/AlphaScene.js'
import BetaScene from './scenes/BetaScene.js'
import GameScene from './scenes/GameScene.js'
import WinScene from './scenes/WinScene.js'

const config = {
  // Configure Phaser graphics settings
  type: Phaser.AUTO,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: CONFIG.DEFAULT_WIDTH,
    height: CONFIG.DEFAULT_HEIGHT,

    min: {
      minWidth : CONFIG.DEFAULT_MINWIDTH,
      minHeight : CONFIG.DEFAULT_MINHEIGHT
    },

    max: {
      maxWidth : CONFIG.DEFAULT_WIDTH,
      maxHeight : CONFIG.DEFAULT_HEIGHT
    }
  },

  // Configure physics settings
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: CONFIG.DEFAULT_GRAVITY },
      debug: __DEV__
    }
  }
}

// Initialize the base phaser game object (must always be done once)
const game = new Phaser.Game(config)

// Add and auto-starting ExampleScene
game.scene.add('StartScene', StartScene)
game.scene.add('ExampleScene', ExampleScene)
game.scene.add('HUDScene', HUDScene)
game.scene.add('PrototypeScene', PrototypeScene)
game.scene.add('JessieTestScene', JessieTestScene)
game.scene.add('AlphaScene', AlphaScene)
game.scene.add('BetaScene', BetaScene)
game.scene.add('GameScene', GameScene)
game.scene.add('WinScene', WinScene)
game.scene.start('StartScene')
