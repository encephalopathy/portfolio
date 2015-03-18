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
		
    }
	
	function _createBackground() {
		var backgroundSurface = new Surface({
			size : [undefined, 250],
			properties : {
				backgroundColor : 'white'
			}
		});
		
		backgroundSurface.pipe(this._eventOutput);
		
		this.add(backgroundSurface);
		this.backgroundSurface = backgroundSurface;
	}
	
	function _createLogos() {
		/*var programmingLogo = new ImageSurface({
			content : ''
		});
		
		var designLogo = new ImageSurface({
			content : ''
		});
		
		var programmingTransform = new StateModifier({
			
		});
		
		var designTransform = new StateModifier({
			
		});*/
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
		
    };

    module.exports = Skills;
});
