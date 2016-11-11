var PhaserGame = PhaserGame || {};
 
//loading the game assets
PhaserGame.Preload = function(){};
 
PhaserGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    
    this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
 
    this.load.setPreloadSprite(this.preloadBar);
 
    //load game assets
        this.load.image('bullet', wpPluginDir+'/js/assets/games/invaders/bullet.png');
        this.load.image('enemyBullet', wpPluginDir+'/js/assets/games/invaders/enemy-bullet.png');
    
        this.load.image('invaderwhite1', wpPluginDir+'/js/assets/games/invaders/invader-white-1.png');
        this.load.image('invaderwhite2', wpPluginDir+'/js/assets/games/invaders/invader-white-2.png');
        this.load.image('invadergrad1', wpPluginDir+'/js/assets/games/invaders/invader-grad-1.png');
        this.load.image('invadergrad2', wpPluginDir+'/js/assets/games/invaders/invader-grad-2.png');
        this.load.image('invaderbrightgreen', wpPluginDir+'/js/assets/games/invaders/invader-brightgreen.png');

        this.load.image('ship', wpPluginDir+'/js/assets/games/invaders/player.png');
        this.load.spritesheet('kaboom', wpPluginDir+'/js/assets/games/invaders/explode.png', 128, 128);
        
        this.load.image('starfield', wpPluginDir+'/js/assets/games/invaders/background_tile.png');
        this.load.image('starfield1', wpPluginDir+'/js/assets/games/invaders/starfield.jpg');
        this.load.image('snow', wpPluginDir+'/js/assets/games/invaders/snow.png');
        this.load.image('rain', wpPluginDir+'/js/assets/games/invaders/rain.png');
        this.load.image('sun', wpPluginDir+'/js/assets/games/invaders/sun.png');

        this.load.image('button-left', wpPluginDir+'/js/assets/games/invaders/control_left.png');
        this.load.image('button-right', wpPluginDir+'/js/assets/games/invaders/control_right.png');
        this.load.image('button-fire', wpPluginDir+'/js/assets/games/invaders/control_shoot.png');
  },
  create: function() {
    this.state.start('Game');
  }
};
