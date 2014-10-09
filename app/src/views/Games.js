/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name Games
     * @constructor
     * @description
     */

    function Games() {
        View.apply(this, arguments);
    }
	
	function _createScrollView() {
		
		var imageScrollView = new ScrollView({
			
		});
		
		var descriptionScrollView = new ScrollView({
			
		})
	}
	
    Games.prototype = Object.create(View.prototype);
    Games.prototype.constructor = Games;

    Games.DEFAULT_OPTIONS = {
    };

    module.exports = Games;
});
