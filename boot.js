var PhaserGame = PhaserGame || {
    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false
};

PhaserGame.Boot = function() {
    //screen related information
    this.windowObject = window;
    this.documentObject = document;
    this.docEl = this.documentObject.documentElement;
    this.bodyElement = this.documentObject.getElementsByTagName('body')[0];
    this.windowWidth = this.windowObject.innerWidth || this.docEl.clientWidth || this.bodyElement.clientWidth;
    this.windowHeight = this.windowObject.innerHeight || this.docEl.clientHeight || this.bodyElement.clientHeight;
    this.screenHeight = screen.height;
    this.screenWidth = screen.width;
};

//setting game configuration and loading the assets for the loading screen
PhaserGame.Boot.prototype = {

    init: function() {
        // console.log(this.scale.screenOrientation);
        // console.log('windowWidth: ' + this.windowWidth);
        // console.log('windowHeight: ' + this.windowHeight);
        // console.log('screenHeight: ' + this.screenHeight);
        // console.log('screenWidth: ' + this.screenWidth);
        // console.log('screenWidth: ' + this.screenWidth);

        this.input.maxPointers = 1;
        this.scale.pageAlignHorizontally = true;
        // this.scale.pageAlignVertically = true;


        //if the game is on desktop; then game centred 800 x 600
        if (this.game.device.desktop) {
           // console.log("DESKTOP");
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            document.getElementById('orientation').style.display = 'none';

        } 
        // else if (this.game.device.iPad) {
        // actually the ipad air has a slightly different aspect ratio
        //     console.log('ipad');
        //      this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        //      var bounds = this.game.scale.bounds;
        //     console.log(bounds);

        //     var width = bounds.width;
        //     var height = bounds.height;

        //     var multiplier;

        //     if (expanding)
        //     {
        //         multiplier = Math.max((height / this.game.height), (width / this.game.width));
        //     }
        //     else
        //     {
        //         multiplier = Math.min((height / this.game.height), (width / this.game.width));
        //     }

        //     this.width = Math.round(this.game.width * multiplier);
        //     this.height = Math.round(this.game.height * multiplier);
        // }
        else {
            //exact fit will use the device 
            //https://github.com/photonstorm/phaser/blob/v2.4.4/src/core/ScaleManager.js#L1688
            //this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // remove the t and cs (done with a media query)
            this.scale.forceOrientation(false, true);
            // this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    },
    enterIncorrectOrientation: function() {
        this.game.paused = true;
        this.game.orientated = false;
        document.getElementById('orientation').style.display = 'block';
        //only works from a user gesture so would need to have a go fullscreen button
        // this.gofull();
    },

    //the deal with fitting stuff to screens
    //
    //using SHOW_ALL, it uses the parent bounds and calculates the aspect ratio to prevent distortion
    //https://github.com/photonstorm/phaser/blob/v2.4.4/src/core/ScaleManager.js#L1659
    //pros: simple and doesn't distort
    //cons: gap at the side if aspect ratio of game doesn't match the aspect ratio of the screen
    //
    //using EXACT_FIT, it uses the parent bounds or the screen size and doesn't apply 
    //an aspect ratio calculation so it will distort to the size of the screen
    //https://github.com/photonstorm/phaser/blob/v2.4.4/src/core/ScaleManager.js#L1659
    //pros: uses the whole screen area preventing any gaps
    //cons: if you have a separate element (header with logo) on the screen from the canvas element then that element
    //will push the game off the screen slightly. (potential fix: you could make the parent container 
    //the exact size of the screen height minus the header - or whatever element it is)
    //
    //going into 'full screen mode' doens't work without a user gesture so you would need a button
    //you could have a start screen and tap which goes full screen into the game
    //using RESIZE: the actual game size is changed to the size of the parent container (so this
    //would be useful if your game could change size to the device and make use of that game is reflowed to container)
    //https://github.com/photonstorm/phaser/blob/v2.4.4/src/core/ScaleManager.js#L621
    //
    //using USER_SCALE:
    //write custom scaling and aspect ratio and adjust it in the resize callback
    //https://github.com/photonstorm/phaser/blob/v2.4.4/src/core/ScaleManager.js#L629



    leaveIncorrectOrientation: function() {
        this.game.paused = false;
        this.game.orientated = true;
        document.getElementById('orientation').style.display = 'none';
    },

    // gofull:function() {

    //     if (this.game.scale.isFullScreen)
    //     {
    //         this.game.scale.stopFullScreen();
    //     }
    //     else
    //     {
    //         this.game.scale.startFullScreen(false);
    //     }

    // },

    preload: function() {
        //assets we'll use in the loading screen
        this.load.image('preloadbar', wpPluginDir + '/js/assets/games/285.gif');
    },

    gameResized: function() {
        // var w = window,
        //         d = document,
        //         e = d.documentElement,
        //         g = d.getElementsByTagName('body')[0],
        //         windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
        //         windowHeight = w.innerHeight || e.clientHeight || g.clientHeight,
        //         screenHeight = screen.height,
        //         screenWidth = screen.width;
        // console.log('windowWidth: ' + windowWidth);
        // console.log('windowHeight: ' + windowHeight);
        // console.log('screenHeight: ' + screenHeight);
        // console.log('screenWidth: ' + screenWidth);
        // console.log("RESIZED");
        console.log(this.scale.screenOrientation);
    },

    create: function() {
        // //loading screen will have a white background
        this.game.stage.backgroundColor = '#000';
        // we make sure camera is at position (0,0)
        this.world.camera.position.set(0, 0);
        //responsive stuff
        //https://github.com/photonstorm/phaser/blob/master/resources/Project%20Templates/Full%20Screen%20Mobile/src/Boot.js
        //https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates
        //http://codepen.io/straker/pen/yasit
        //resize event
        // var addEvent = function(object, type, callback) {
        //     if (object == null || typeof(object) == 'undefined') return;
        //     if (object.addEventListener) {
        //         object.addEventListener(type, callback, false);
        //     } else if (object.attachEvent) {
        //         object.attachEvent("on" + type, callback);
        //     } else {
        //         object["on" + type] = callback;
        //     }
        // };

        // addEvent(window, "resize", function(event) {
        // console.log('resized');
        // });
        this.state.start('Preload');
    }
};