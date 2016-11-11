var PhaserGame = PhaserGame || {};

PhaserGame.Game = function(PhaserGame) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    //https://github.com/photonstorm/phaser/blob/master/resources/Project%20Templates/Basic/Game.js
    //this.game;      //  a reference to the currently running game (Phaser.Game)
    //this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    //this.camera;    //  a reference to the game camera (Phaser.Camera)
    //this.cache;     //  the game cache (Phaser.Cache)
    //this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    //this.load;      //  for preloading assets (Phaser.Loader)
    //this.math;      //  lots of useful common math operations (Phaser.Math)
    //this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    //this.stage;     //  the game stage (Phaser.Stage)
    //this.time;      //  the clock (Phaser.Time)
    //this.tweens;    //  the tween manager (Phaser.TweenManager)
    //this.state;     //  the state manager (Phaser.StateManager)
    //this.world;     //  the game world (Phaser.World)
    //this.particles; //  the particle manager (Phaser.Particles)
    //this.physics;   //  the physics manager (Phaser.Physics)
    //this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

//responsive
//we don't want any scaling to happen that distorts the sprites
//so we don't want percentage height without fixed width
//or percentage width without fixed height
//e.g. the game has to scale with a fixed aspect ratio
//opt 1:
//the game is portrait sized
//and scales slightly to the device
//opt 2: 
//the game is portrait sized
//and .... well it has to fit the device
//- (e.g. nothing outside of the screen that shouldnt be outside
//e.g. controls, sprites, aliens player)
//- there should be no borders / black spaces around the game

//Possible options:
//Game is set the exact size of a variety of devices and swapped based on device
//Game is sized based on exact set of window sizes  and swapped based on window size
//Game is sized according to screen size then it goes full screen on start
//Either:
//Game is fixed to portrait and scaled keeping aspect ratio (There should be a portrait sized version of the game which fits into a portrait area - eg it is designed for portrait)
//Game is fixed to landscape and scaled keeping aspect ratio  (There should be a landscape sized version of the game which fits into a landcsape area - e.g. it is designed for landscape)
//or device orientation is detected and a portrait or landscape version is served
//It would make it simpler forcing portrait or landscape and I think it lends itself better to landscape to be honest because most of the game is moving from side to side



};

PhaserGame.Game.prototype = {
    create: function() {

    /**
     * useful - 
     * http://phaser.io/docs/2.4.7/Phaser.Group.html
     * http://www.phaser.io/docs/2.4.7/Phaser.World.html
     */

        this.starfield;

        this.wpLevel = 'teaser';

        if (typeof wpLevel !== "undefined") {this.wpLevel = wpLevel;}

        this.starfield = this.add.tileSprite(0, 0, 600, 800, 'starfield');

         if(this.wpLevel == 2 ){
           this.sun = this.add.sprite(((this.world.width/2)-50), 300, 'sun');
         }

         //positioning
         this.topLeft;
         this.topRight;
         this.topCentre;
        this.bottomLeft;
        this.bottomRight;
        this.bottomCentre;
        this.positionCentreX;
        this.postitionCentreY;

        //controls
        this.buttonLeft;this.buttonRight;this.buttonFire;
        this.isLeftDown = false;this.isRightDown = false;this.isFireDown = false;
        this.cursors;this.fireButton;this.leftKey;this.rightKey;
        //timer
        this.timerString = '';this.timerText;
        this.timeElapsed;
        this.timeLimit=10;
        this.timeGameEnded;
        //score
        this.score = 0;this.scoreString = '';this.scoreText;
        //fx
        this.shakeyTime;
        //player
        this.player;
        this.lives;
        //playerposition
        this.player = this.add.sprite(300, 690, 'ship');
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.enableBody=true;    
        this.player.physicsBodyType = Phaser.Physics.ARCADE;
        this.player.body.collideWorldBounds=true;

        this.killTotal;
        //enemy
        this.aliens;this.enemyBullet;this.livingEnemies = [];this.allAliensDead;this.bullets;this.bulletTime = 0;
        this.explosions;this.firingTimer = 0;
        this.aliens = this.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        this.alienPosition; 
        //for affecting the speed for level 3
        this.alienTweenDuration = 350;this.playerMoveSpeed = 400;this.bulletRate = 1;   
        this.stateText;
        //Our bullet group
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        // The enemy's bullets
        this.enemyBullets = this.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(30, 'enemyBullet');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);
        //Score
        this.scoreString = trans_score + ' : ';
        // NEEDS A RELATIVE SIZE OF THE FONT???
        this.scoreText = this.add.text( 10, 10, this.scoreString + this.score, {
            font: '28px Arial',
            fill: '#fff'
        });
        //Time
        this.timerString = trans_time + ' : ';
        this.timerText = this.add.text(480, 10, this.timerString + '0', {
            font: '28px Arial',
            fill: '#fff'
        });
        this.time.events.add(Phaser.Timer.SECOND * 10, this.endGameplay, this);
        // Create a delayed event 1m and 30s from now
        this.timer =  this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 10, this.endTimer, this);

        //State Text
        this.stateText = this.add.text(this.world.centerX, this.world.centerY, ' ', {
            font: '54px Arial',
            fill: '#fff'
        });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
        //  An explosion pool
        this.explosions = this.add.group();
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.forEach(this.setupInvader, this);
        //  And some controls to play the game with
        this.cursors = this.input.keyboard.createCursorKeys();
        //a group for the buttons
        this.controlsLayer = this.make.group(this,null,'controlsLayer',false);
        this.controlsLayer.x=this.world.width/2;
        this.controlsLayer.y=770;
        //buttons
        this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.D);

        //world width is number of pixels of world
        //is doesn't change if you scale the size of window
        //console.log('world width: ' + this.world.width);
        //same as world width
        //console.log('stage width: ' + this.stage.width);
        //size of the device screen
        //console.log('screen width: ' + screen.width);
        //changes if you change window size (obvs)
        //console.log('window width: ' + window.innerWidth);


        this.buttonLeft = this.make.button( (0-(this.world.width/2.2)), -15, 'button-left', this.actionClick, this, 2, 1, 0);
        this.buttonLeft.scale.setTo(0.5, 0.5);
        
        this.buttonFire = this.make.button( -45, -15, 'button-fire', this.actionClick, this, 2, 1, 0);
        this.buttonFire.scale.setTo(0.5, 0.5);

        this.buttonRight = this.make.button( (0+(this.world.width/2.5)), -15, 'button-right', this.actionClick, this, 2, 1, 0);
        this.buttonRight.scale.setTo(0.5, 0.5);

        this.buttonLeft.onInputUp.add(this.leftUp, this);
        this.buttonRight.onInputUp.add(this.rightUp, this);
        this.buttonFire.onInputUp.add(this.fireUp, this);
        this.buttonLeft.onInputDown.add(this.leftDown, this);
        this.buttonRight.onInputDown.add(this.rightDown, this);
        this.buttonFire.onInputDown.add(this.fireDown, this);
        //add buttons to layer
        this.controlsLayer.add(this.buttonLeft);
        this.controlsLayer.add(this.buttonRight);
        this.controlsLayer.add(this.buttonFire);

        this.playerFlashing = this.add.tween(this.player);

        this.createAliens();

        if(typeof mnt_space_invaders_game_save_user_data !== "undefined"){
            this.mnt_space_invaders_game_save_user_data = mnt_space_invaders_game_save_user_data;
        }

        if (this.wpLevel == 1) {
            this.quake();
            //this.addTitle(trans_shaky_text);
        }
        if (this.wpLevel == 2) {
            this.rain();
            this.snow();
            //this.addTitle(trans_weather_conditions);
        }
        if(this.wpLevel == 3 ){
            this.bulletRate = 1.02;
            //this.addTitle(trans_longer_distances);
        }
        if(this.wpLevel == 4){
            //swap some sprites
            //this.addTitle(trans_true_rep);
        }
         //or 1.02 to speed up    

        this.createdAliens = this.aliens.total;

        if (this.game.device.desktop) {

        }else{
            this.buttonFire.visible = false;
        }

        this.timer.start();
    },
    gameResized:function(){
        console.log("RESIZE");
    },
    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        //return minutes.substr(-2) + ":" + seconds.substr(-2);   
        return seconds.substr(-2);   
    },
    endTimer: function() {
        // Stop the timer when the delayed event triggers
        this.timer.stop();
    },
    updateTimer: function(){
           //update the time
        this.timeElapsed = this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
        this.timerText.text = this.timerString + this.timeElapsed;
    },
    update: function() {
        //  Scroll the background
        this.starfield.tilePosition.y += 2;
        this.alienPosition = this.aliens.y;

        if(this.aliens.countLiving() != 0 && this.timer.running){
            this.updateTimer();
        }

        if (this.player.alive) {
            this.player.body.velocity.setTo(0, 0);
            //  Reset the player, then check for movement keys
            if (this.cursors.left.isDown || this.isLeftDown || this.leftKey.isDown || (this.game.input.activePointer.isDown && this.game.input.activePointer.x < this.game.width/4) ) {
                //boolean
                if(!this.playerFlashing.isRunning){
                    this.player.body.velocity.x = -this.playerMoveSpeed;
                }
            } else if (this.cursors.right.isDown || this.isRightDown || this.rightKey.isDown ||  (this.game.input.activePointer.isDown && this.game.input.activePointer.x > this.game.width/2 + this.game.width/4) ) {
            if(!this.playerFlashing.isRunning) 
                {
                    this.player.body.velocity.x = this.playerMoveSpeed;
                }
            } 
            //  Firing?
            if (this.fireButton.isDown || this.isFireDown ||  (this.game.input.activePointer.isDown && this.game.input.activePointer.y > this.game.height/8) ) {
                this.fireBullet();
            }
            if (this.time.now > this.firingTimer) {
                this.enemyFires();
            }
            //  Run collision
            this.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
            this.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
            this.physics.arcade.overlap(this.aliens, this.player, this.enemyCollidesPlayer, null, this);
        }
    },

    callServer: function(){
        this.killTotal = this.createdAliens - this.aliens.total;
        levelProgressStatus = 1;

        jQuery.ajax({
            url: this.mnt_space_invaders_game_save_user_data.ajaxurl,
            type: 'GET',
            data: ({
                action: 'mnt_space_invaders_game_save_user_data',
                score: this.score,
                level: this.wpLevel,
                killtotal: this.killTotal,
                timeremaining:this.timeLimit-this.timeGameEnded,
                levelProgressStatus:levelProgressStatus
            }),
            success: function(data) {
                $parsedData = jQuery.parseJSON(data);
            },
            error: function(data) {}
        });
    },

    createAliens: function() {
        var rows = 4;
        var columns = 10;
        switch(this.wpLevel) {
            case "1":rows=4;break;
            case "2":rows=4;break;
            case "3":rows=2;break;
            case "4":rows=4;break;
            default:
        }
        //number of aliens change
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < columns; x++) {
                var aliensprite='invaderwhite1';
                if(this.wpLevel == 1 || this.wpLevel == 2 || this.wpLevel == 3){
                    if(y==1 || y==3){
                    aliensprite= 'invaderwhite1';
                   }else {
                    aliensprite = 'invaderwhite2';
                   }
                }else if(this.wpLevel == 4){
                    console.log(y);
                    if(y==0){                    
                    aliensprite = 'invaderbrightgreen';
                   }else if(y==1) {
                     aliensprite ='invadergrad1';
                   }
                   else if(y==2) {
                    aliensprite ='invadergrad2';
                   }
                   else if(y==3) {
                   aliensprite ='invaderwhite1';
                   }
                }
                
                var alien = this.aliens.create(x * 48, y * 50, aliensprite);

                alien.body.collideWorldBounds=true;

                alien.anchor.setTo(0.5, 0.5);
                alien.body.moves = false;
            }
        }

        this.aliens.x = 60;
        this.aliens.y = 60;

        //tween to(properties, duration, ease, autoStart, delay, repeat, yoyo)
        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        var tween = this.add.tween(this.aliens).to({
            x: 100
        }, this.alienTweenDuration, Phaser.Easing.Linear.None, true, 0, 1000, true);

        tween.onRepeat.add(this.descend, this);


    },

    actionClick: function() {},

    leftUp: function() {this.isLeftDown = false;},

    rightUp: function() {this.isRightDown = false;},

    fireUp: function() {this.isFireDown = false;},

    leftDown: function() {this.isLeftDown = true;},

    rightDown: function() {this.isRightDown = true;},

    fireDown: function() {this.isFireDown = true;},

    setupInvader: function(invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');
    },

    descend: function() {if(this.alienPosition <= 550){this.aliens.y += 22;}}
    ,
    endGameplay: function() {
        this.player.kill();
        this.enemyBullets.callAll('kill');

        if(this.timeElapsed > 0 && this.aliens.countLiving() == 0){
            this.stateText.text = trans_you_killed_all_the_aliens_with + '\n' + (this.timeLimit - this.timeGameEnded) + ' ' + trans_seconds_left;
            this.allAliensDead = true;
        }
        //if there is no time and still aliens
        //you are here because the time ran out
        else{
            this.stateText.text =  trans_time_is_up + '.\n' + trans_score +' ' + this.score;
        }
        this.stateText.visible = true;
        //if you are on the teaser
        //don't call the server
        if(this.wpLevel != 'teaser'){
           this.callServer();
        }
        this.input.onTap.addOnce(this.redirectOutro, this);
    },

    //player does stuff
    fireBullet: function() {
        //  To avoid them being allowed to fire too fast we set a time limit
        if ((this.time.now * this.bulletRate) > this.bulletTime) {
            //  Grab the first bullet we can from the pool
            this.bullet = this.bullets.getFirstExists(false);
            if (this.bullet) {
                //  And fire it
                this.bullet.reset(this.player.x, this.player.y + 8);
                this.bullet.body.velocity.y = -1000;
                this.bulletTime = this.time.now + 200;
            }
        }
    },

    resetBullet: function(bullet) {
        //  Called if the bullet goes out of the screen
        bullet.kill();
    },

    //enemy does stuff
    enemyFires: function() {
        //  Grab the first bullet we can from the pool
        this.enemyBullet = this.enemyBullets.getFirstExists(false);
        this.livingEnemies.length = 0;
        self = this;
        this.aliens.forEachAlive(function(alien) {
            // put every living enemy in an array
            self.livingEnemies.push(alien);
        });
        if (this.enemyBullet && this.livingEnemies.length > 0) {
            var random = this.rnd.integerInRange(0, this.livingEnemies.length - 1);
            // randomly select one of them
            var shooter = this.livingEnemies[random];
            // And fire the bullet from this enemy
            this.enemyBullet.reset(shooter.body.x, shooter.body.y);
            this.physics.arcade.moveToObject(this.enemyBullet, this.player, 250);
            this.firingTimer = this.time.now + 800;
        }
    },

    //things interact
    collisionHandler: function(bullet, alien, player) {
        //  When a bullet hits an alien we kill them both
        bullet.kill();
        alien.kill();
        //  Increase the score
        if (this.wpLevel != 'teaser'){
            this.score += this.wpLevel*100;
        }else{
            this.score += 10;
        }
        this.scoreText.text = this.scoreString + this.score;
        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);
        if (this.aliens.countLiving() == 0) {
            this.timeGameEnded = this.timeElapsed;
            this.endGameplay();
        }

    },
    enemyCollidesPlayer: function(player, enemy) {
        if(typeof bullet != 'undefined'){
            bullet.kill();
        }
        this.scoreText.text = this.scoreString + this.score;
        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(this.player.body.x, this.player.body.y);
        explosion.play('kaboom', 30, false, true);
    },

    flashPlayer: function(){
        this.player.alpha=0.1;
        this.playerFlashing.to({alpha:1},50, "Linear",true, 0,15,true);
        this.playerFlashing.onComplete.add(this.alphaUp, this);
    },

    alphaUp: function(){
            this.player.alpha=1;
    },

    enemyHitsPlayer: function(player, bullet) {
        this.flashPlayer();
        if(typeof bullet != 'undefined'){
            bullet.kill();
        }
        this.scoreText.text = this.scoreString + this.score;
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(this.player.body.x, this.player.body.y);
        explosion.play('kaboom', 30, false, true);
    },

    redirectOutro: function() {
        // similar behavior as an HTTP redirect
        var fulldomain = 'http://' + window.location.hostname;
        //WARN: does this work with translations?
        if(this.wpLevel == 'teaser'){
             window.location.replace(fulldomain+"/taster-outro/");
        }else if (this.wpLevel == 1||this.wpLevel == 2||this.wpLevel == 3){
            window.location.replace(fulldomain+"/level-" + this.wpLevel  + "-finish/");
        }else if (this.wpLevel == 4){
            window.location.replace(fulldomain+"/scoreboard-your-scores/");
        }
    },

    //fx
    quake: function() {

        var intensity=0.008;
        var duration=300;
        var force=false;
        var direction=Phaser.Camera.SHAKE_HORIZONTAL;
        var shakebounds=true;
        //phaser now has an inbuilt shake method for camera
        this.camera.shake(intensity,duration,force,direction,shakebounds);
        
        var quaking = this.camera.onShakeComplete;
        quaking.add(this.quake,this);
    },

    //rain
    rain: function() {
        var emitter = this.add.emitter(this.world.centerX, 0, 400);
        emitter.width = this.world.width;
        emitter.angle = 15; //angle for the rain.
        emitter.makeParticles('rain');
        emitter.minParticleScale = 0.2;
        emitter.maxParticleScale = 0.9;
        emitter.setYSpeed(1000, 1250);
        emitter.setXSpeed(40, 100);
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.start(false, 3500, 0.1, 0);
    },

    //rain
    snow: function() {
        var emitter = this.add.emitter(this.world.centerX, 0, 400);
        emitter.width = this.world.width;
        emitter.angle = 5; //angle for the rain.
        emitter.makeParticles('snow');
        emitter.minParticleScale = 0.2;
        emitter.maxParticleScale = 0.9;
        emitter.setYSpeed(500, 800);
        emitter.setXSpeed(20, 50);
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.start(false, 3500, 0.1, 0);
    },

    render: function() {
    },

    addTitle: function(string) {
        var title = this.add.text(400, 600, string, {
           font: '20px Arial',
            fill: '#fff'
        });
        title.anchor.set(0.5, 0.85);
    }
}
