import Phaser from 'phaser'
import Util from '../util'
import CONFIG from '../config.js'

class LvlSelectScene extends Phaser.Scene {

    preload () {

        //load images for scene
        this.load.image('Backround', 'assets/Picture_Perfect_Checker_Claire.jpg')
        this.load.image('Lvl1Preview', 'assets/wivenhoe_park,_essex_1942.9.10.png')
        this.load.image('Lvl1Frame','assets/Picture perfect- Frame.png')

    }

    create () {

        //implement backround image
        const backround = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'Backround')
        backround.setScale(
          CONFIG.DEFAULT_WIDTH / backround.width ,
          CONFIG.DEFAULT_HEIGHT / backround.height
        )

        //add loaded images to scene
        this.add.image(520, 297,'Lvl1Preview').setScale(0.3)
        this.add.image(1400, 297,'Lvl1Preview').setScale(0.3)
        this.add.image(520, 769,'Lvl1Preview').setScale(0.3)
        this.add.image(1400, 769,'Lvl1Preview').setScale(0.3)


        //changing font changes location
        //lvl 1 Text
        this.level1Text = this.add.text(
            CONFIG.DEFAULT_WIDTH / 2,
            CONFIG.DEFAULT_HEIGHT / 2,
            'Level 1', { font: '30pt Times New Roman', color: '#fa2537', origin: 'center' }
          )
          //sets location on screen
          this.level1Text.setOrigin(4.1,2)

          //lvl 2 Text
          this.level2Text = this.add.text(
            CONFIG.DEFAULT_WIDTH / 2,
            CONFIG.DEFAULT_HEIGHT / 2,
            'Level 2', { font: '30pt Times New Roman', color: '#fa2537', origin: 'center' }
          )
          this.level2Text.setOrigin(-3.1,2)

          //lvl 3 Text
          this.level3Text = this.add.text(
            CONFIG.DEFAULT_WIDTH / 2,
            CONFIG.DEFAULT_HEIGHT / 2,
            'Level 3', { font: '30pt Times New Roman', color: '#fa2537', origin: 'center' }
          )
          this.level3Text.setOrigin(4.1,-9)

           //lvl 4 Text
           this.level4Text = this.add.text(
            CONFIG.DEFAULT_WIDTH / 2,
            CONFIG.DEFAULT_HEIGHT / 2,
            'Level 4', { font: '30pt Times New Roman', color: '#fa2537', origin: 'center' }
          )
          this.level4Text.setOrigin(-3.1,-9)

    }

}

export default LvlSelectScene