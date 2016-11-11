var PhaserGame = PhaserGame || {};
/**
 * [game description]
 *
 * width: The width of your game in game pixels. If given as a string the value must be between 0 and 100 and will be used as the percentage width of the parent container, or the browser window if no parent is given
 * http://phaser.io/docs/2.4.7/Phaser.Game.html
 * 
 * @type {Phaser}
 */

//PhaserGame.game = new Phaser.Game(800, 600, Phaser.AUTO,'game');
// PhaserGame.game = new Phaser.Game("100%", "100%", Phaser.AUTO,'game');
PhaserGame.game = new Phaser.Game(600, 800, Phaser.CANVAS,'game');
//PhaserGame.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');
PhaserGame.game.state.add('Boot', PhaserGame.Boot);
PhaserGame.game.state.add('Preload', PhaserGame.Preload);
PhaserGame.game.state.add('Game', PhaserGame.Game);

PhaserGame.game.state.start('Boot');