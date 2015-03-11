/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
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
			properties : {
				backgroundColor : 'white'
			}
		});
		
		backgroundSurface.pipe(this._eventOutput);
		
		this.add(backgroundSurface);
	}

    Skills.prototype = Object.create(View.prototype);
    Skills.prototype.constructor = Skills;

    Skills.DEFAULT_OPTIONS = {
		
    };

    module.exports = Skills;
});
