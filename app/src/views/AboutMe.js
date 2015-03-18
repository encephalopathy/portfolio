/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');

    /*
     * @name AboutMe
     * @constructor
     * @description
     */
	
	function _createBackground() {
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		var backgroundSurface = new Surface({
			properties : {
				backgroundColor : 'black',
				boxShadow: '0 0 5px black'
			}
		});
		
		var stateModifier = new StateModifier({
			transform : Transform.translate(centerX, centerY, 5),
			origin : [0.5, 0.5]
		});
		
		this.fadeInOutModifier = new StateModifier({
			opacity : 1
		});
		
		this.add(this.fadeInOutModifier).add(backgroundSurface);
		
		this.backgroundSurface = backgroundSurface;
		this.backgroundSurface.pipe(this._eventOutput);
		this.backgroundTransformModifier = stateModifier;
	}
	
	function _createTitle() {
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		var title = new Surface({
			size : [true, true],
			content : this.options.title,
			properties : {
                color: 'white',
                fontFamily: 'AvenirNextCondensed-DemiBold',
                fontSize: 54 + 'px',
                textTransform: 'uppercase',
                pointerEvents : 'none',
				textAlign : 'center'
			}
		});
		
		var transformModifier = new StateModifier({
			transform : Transform.translate(centerX + 125, centerY - 200, 5),
			origin : [0.5, 0.5]
		});
		
		var fadeInOutModifier = new StateModifier({
			opacity : 1
		});
		
		this.add(fadeInOutModifier).add(transformModifier).add(title);
		
		this.titleTransformModifier = transformModifier;
		this.titleFadeInOutModifier = fadeInOutModifier;
	}
	
	function _createAvatar() {
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		var avatar = new ImageSurface({
			size : [250, 250],
			content : this.options.avatarURL,
			properties : {
				pointerEvents : 'none'
			}
		});
		
		var avatarTransformModifier = new StateModifier({
			transform : Transform.translate(this.options.avatarOffsetX + centerX, centerY + -50, 5),
			origin : [0.5, 0.5]
		});
		
		var avatarOpacityModifier = new StateModifier({
			opacity : 1
		});
		
		this.add(avatarOpacityModifier).add(avatarTransformModifier).add(avatar);
		
		this.avatarTransformModifier = avatarTransformModifier;
		this.avatarOpacityModifier = avatarOpacityModifier;
	}
	
	function _createDescription() {
		
		
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		var title = new Surface({
			size : [400, 400],
			content : this.options.bio,
			properties : {
                color: 'white',
                fontFamily: 'Avenir',
                fontSize: 18 + 'px',
                pointerEvents : 'none',
				textAlign : 'center'
			}
		});
		
		var transformModifier = new StateModifier({
			transform : Transform.translate(centerX + 150, centerY + 70, 5),
			origin : [0.5, 0.5]
		});
		
		var fadeInOutModifier = new StateModifier({
			opacity : 1
		});
		
		this.add(fadeInOutModifier).add(transformModifier).add(title);
		
		this.descriptionTransformModifier = transformModifier;
		this.descriptionFadeInOutModifier = fadeInOutModifier;
	}

    function AboutMe() {
        View.apply(this, arguments);
		_createBackground.call(this);
		_createTitle.call(this);
		_createDescription.call(this);
		_createAvatar.call(this);
		this.direction = 1;
    }
	
	

    AboutMe.prototype = Object.create(View.prototype);
    AboutMe.prototype.constructor = AboutMe;
	
	AboutMe.prototype.transitionIn = function(data) {
		if (data != undefined) {
			this.options.name = data.name;
			this.options.avatarPath = data.imagePath;
			this.options.bio = data.bio;
		}
		
		this.backgroundSurface.pipe(this._eventOutput);
		
		this.titleFadeInOutModifier.setOpacity(
			0.8,
			{ duration : 1000, curve : 'easeInOut'}
		);
		
		this.fadeInOutModifier.setOpacity(
			0.8,
			{ duration : 1000, curve : 'easeInOut'}
		);
		
		this.descriptionFadeInOutModifier.setOpacity(
			0.8,
			{ duration : 1000, curve : 'easeInOut'}
		);
		
		this.avatarOpacityModifier.setOpacity(
			0.8,
			{ duration : 1000, curve : 'easeInOut'}
		);
		
	}
	
	function _hideHome() {
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		
		this.backgroundSurface.pipe(this._eventOutput);
		
		this.titleFadeInOutModifier.setOpacity(
			0,
			{ duration : 1000, curve : 'easeInOut'}
		);
		
		this.fadeInOutModifier.setOpacity(
			0,
			{ duration : 1000, curve : 'easeInOut'}
		);
		
		this.descriptionFadeInOutModifier.setOpacity(
			0,
			{ duration : 1000, curve : 'easeInOut'}
		);
		
		this.avatarOpacityModifier.setOpacity(
			0,
			{ duration : 1000, curve : 'easeInOut'}
		);
	}
	
	AboutMe.prototype.transitionOut = function(oldTabName, orderNumber) {
		if (this.options.orderNumber < orderNumber) {
			this.direction = 1;
		}
		else {
			this.direction = -1;
		}
		
		switch (oldTabName) {
			case 'About Me':
			break;
			default:
				_hideHome.call(this);
				this.backgroundSurface.unpipe(this._eventOutput);
		}
		
	}

    AboutMe.DEFAULT_OPTIONS = {
		width : 750,
		height : 600,
		title : 'Brent Arata',
		avatarOffsetX : -200,
		avatarOffsetY : -100,
		avatarURL : 'content/images/brent_veeva.png',
		bio : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		startingDepth : 750,
		orderNumber : 1
    };

    module.exports = AboutMe;
});
