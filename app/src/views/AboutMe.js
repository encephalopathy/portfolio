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

    function AboutMe() {
        View.apply(this, arguments);
		_createBackground.call(this);
		_createTitle.call(this);
		_createDescription.call(this);
		_createAvatar.call(this);
    }
	
	function _createBackground() {
		var backgroundSurface = new Surface({
			size : [this.options.width, this.options.height],
			properties : {
				backgroundColor : 'black',
				boxShadow: '0 0 5px black',
			}
		});
		
		var stateModifier = new StateModifier({
			transform : Transform.translate(0, 1000, 5),
			origin : [0.5, 0.5]
		});
		
		this.fadeInOutModifier = new StateModifier({
			opacity : 0
		});
		
		this.add(stateModifier).add(this.fadeInOutModifier).add(backgroundSurface);
		//this.add(stateModifier).add(backgoundSurface);
		
		this.backgroundSurface = backgroundSurface;
		this.backgroundTransformModifier = stateModifier;
	}
	
	function _createTitle() {
		var title = new Surface({
			size : [true, true],
			content : this.options.title,
			properties : {
                color: 'white',
                fontFamily: 'AvenirNextCondensed-DemiBold',
                fontSize: 12 + 'px',
                textTransform: 'uppercase',
                pointerEvents : 'none',
				textAlign : 'center'
			}
		});
		
		var transformModifier = new StateModifier({
			transform : Transform.translate(0, 1000, 5),
			origin : [0.5, 0.5]
		});
		
		var fadeInOutModifier = new StateModifier({
			opacity : 0
		});
		
		this.add(fadeInOutModifier).add(transformModifier).add(title);
		
		this.titleTransformModifier = transformModifier;
		this.titleFadeInOutModifier = fadeInOutModifier;
	}
	
	function _createAvatar() {
		var avatar = new ImageSurface({
			size : [100, 100],
			content : this.options.avatarURL,
			properties : {
				pointerEvents : 'none'
			}
		});
		
		var avatarTransformModifier = new StateModifier({
			transform : Transform.translate(0, this.options.startingDepth, 5),
			origin : [0.5, 0.5]
		});
		
		var avatarOpacityModifier = new StateModifier({
			opacity : 0
		});
		
		this.add(avatarOpacityModifier).add(avatarTransformModifier).add(avatar);
		
		this.avatarTransformModifier = avatarTransformModifier;
		this.avatarOpacityModifier = avatarOpacityModifier;
	}
	
	function _createDescription() {
		var title = new Surface({
			size : [true, true],
			content : this.options.bio,
			properties : {
                color: 'white',
                fontFamily: 'AvenirNextCondensed-DemiBold',
                fontSize: 12 + 'px',
                textTransform: 'uppercase',
                pointerEvents : 'none',
				textAlign : 'center'
			}
		});
		
		var transformModifier = new StateModifier({
			transform : Transform.translate(0, this.options.startingDepth, 5),
			origin : [0.5, 0.5]
		});
		
		var fadeInOutModifier = new StateModifier({
			opacity : 0
		});
		
		this.add(fadeInOutModifier).add(transformModifier).add(title);
		
		this.descriptionTransformModifier = transformModifier;
		this.descriptionFadeInOutModifier = fadeInOutModifier;
	}

    AboutMe.prototype = Object.create(View.prototype);
    AboutMe.prototype.constructor = AboutMe;
	
	AboutMe.prototype.transitionIn = function(data) {
		if (data != undefined) {
			this.options.name = data.name;
			this.options.avatarPath = data.imagePath;
			this.options.bio = data.bio;
		}
		
		this.backgroundTransformModifier.setTransform(
			Transform.translate(0, 0, 5),
			{ duration : 1000 , curve : 'easeInOut' }
		);
		
		this.descriptionTransformModifier.setTransform(
			Transform.translate(0, 50, 5),
			{ duration : 1000 , curve : 'easeInOut' }
		);
		
		this.titleTransformModifier.setTransform(
			Transform.translate(0, -200, 6),
			{ duration : 1000 , curve : 'easeInOut' }
		);
		
		this.avatarTransformModifier.setTransform(
			Transform.translate(0, -50, 5),
			{ duration : 1000 , curve : 'easeInOut' }
		)
		
		
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
		)
		
	}
	
	function _hideHome() {
		var hideLoc = this.options.startingDepth;
		
		this.backgroundTransformModifier.setTransform(
			Transform.translate(0, hideLoc, 5),
			{ duration : 1000 , curve : 'easeInOut' }
		);
		
		this.descriptionTransformModifier.setTransform(
			Transform.translate(0, hideLoc, 5),
			{ duration : 1000 , curve : 'easeInOut' }
		);
		
		this.titleTransformModifier.setTransform(
			Transform.translate(0, hideLoc, 6),
			{ duration : 1000 , curve : 'easeInOut' }
		);
		
		this.avatarTransformModifier.setTransform(
			Transform.translate(0, hideLoc, 5),
			{ duration : 1000 , curve : 'easeInOut' }
		)
		
		
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
		)
	}
	
	AboutMe.prototype.transitionOut = function(oldTabName) {
		switch (oldTabName) {
			case 'About Me':
			break;
			default:
				_hideHome.call(this);
		}
	}

    AboutMe.DEFAULT_OPTIONS = {
		width : 500,
		height : 500,
		title : 'Brent Arata',
		avatarURL : 'content/images/brent_veeva.png',
		bio : 'Born and raised in the south!',
		startingDepth : 750
    };

    module.exports = AboutMe;
});
