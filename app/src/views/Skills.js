/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
	var ImageSurface = require('famous/surfaces/ImageSurface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name Skills
     * @constructor
     * @description
     */

    function Skills() {
        View.apply(this, arguments);
		
		_createBackground.call(this);
		_createLogos.call(this);
		
    }
	
	function _createBackground() {
		var backgroundSurface = new Surface({
			size : [undefined, undefined],
			properties : {
				backgroundColor : 'blue'
			}
		});
		
		backgroundSurface.pipe(this._eventOutput);
		
		this.add(backgroundSurface);
		this.backgroundSurface = backgroundSurface;
	}
	
	function _createLogos() {
		var programmingLogo = new ImageSurface({
			content : 'content/images/Programming_Logo_One.png',
			size : [400, 400]
		});
		
		var designLogo = new ImageSurface({
			content : 'content/images/paint_brush_wooden_figure_logo.jpg',
			size : [400, 400]
		});
		
		var textSize = this.options.textSize
		var programmingText = new Surface({
			color: 'black',
			content : 'Programming',
			size : [textSize, textSize],
            fontFamily: 'AvenirNextCondensed-DemiBold',
            fontSize: this.options.fontSize + 'px',
            textTransform: 'uppercase',
            pointerEvents : 'none',
			textAlign : 'center'
			
		});
		
		var designText = new Surface({
			color: 'black',
			content : 'Art & Design',
			size : [textSize, textSize],
            fontFamily: 'AvenirNextCondensed-DemiBold',
            fontSize: this.options.fontSize + 'px',
            textTransform: 'uppercase',
            pointerEvents : 'none',
			textAlign : 'center'
		});
		
		
		var centerX = window.innerWidth / 3;
		var centerDisplacement = this.options.centerDisplacement;
		
		var programmingTransform = new StateModifier({
			transform : Transform.translate(centerX - centerDisplacement, 0, 7)
		});
		
		var programmingTitleTransform = new StateModifier({
			transform : Transform.translate(centerX - textSize / 2, 400, 7)
		})
		
		var designTransform = new StateModifier({
			transform : Transform.translate(centerX + centerDisplacement, 0, 7)
		});
		
		var designTextTransform = new StateModifier({
			transform : Transform.translate(centerX + centerDisplacement, 400, 7)
		})
		
		//Add all the icons to the view.
		this.add(programmingTransform).add(programmingLogo);
		this.add(programmingTitleTransform).add(programmingText);
		this.add(designTransform).add(designLogo);
		this.add(designTextTransform).add(designText);
		
		programmingLogo.pipe(this._eventOutput);
		designLogo.pipe(this._eventOutput);
		programmingText.pipe(this._eventOutput);
		designText.pipe(this._eventOutput);
	}
	
	Skills.prototype.transitionIn = function() {
		this.backgroundSurface.pipe(this._eventOutput);
	}
	
	Skills.prototype.transitionOut = function() {
		this.backgroundSurface.unpipe(this._eventOutput);
	}


    Skills.prototype = Object.create(View.prototype);
    Skills.prototype.constructor = Skills;

    Skills.DEFAULT_OPTIONS = {
		fontSize : 50,
		centerDisplacement : 250,
		textSize : 200
    };

    module.exports = Skills;
});
