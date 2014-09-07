/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name Gallery
     * @constructor
     * @description
     */

    function Gallery() {
        View.apply(this, arguments);
    }

    Gallery.prototype = Object.create(View.prototype);
    Gallery.prototype.constructor = Gallery;

    Gallery.DEFAULT_OPTIONS = {
		
    };
	
	function createBackground() {
		Surface surface = new Surface({
			size : [true, true],
			properties : {
	            backgroundColor: 'black',
	            boxShadow: '0 0 1px black',
				origin : [0.5, 0.5],
				opacity : 0.5
			}
		});
		
		var stateModifier = new StateModifier({
			transform : Transform.behind
		});
		
		stateModifier.setTransform(
			Transform.translate(0,0,0), 
			{ duration : 1000, curve : 'easeInOut' }
		);
		
		stateModifier.setOpacity(1, {
    		duration: 2000, curve: Easing.outBack
		});
		
		this.add(stateModifier).add(surface);
		
	}

    module.exports = Gallery;
});
