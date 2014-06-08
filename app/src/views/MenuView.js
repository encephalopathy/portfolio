/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name MenuView
     * @constructor
     * @description
     */

    function MenuView() {
        View.apply(this, arguments);
		_createTabs.call(this);
    }
	
	function _createTabs() {
		var xOffset = 0;
		var width = this.options.width;
		var height = this.options.height;
		
		console.log(this.options.tabData);
		console.log('width: ' + width);
		console.log('height: ' + height);
		
		for (var i = 0; i < this.options.tabData.length; ++i) {
			var surface = new Surface({
				properties : {
					size : [width, height],
					background : 'black',
					//opacity : 0.5
				},
			});
			
			print('Adding a surface')
			var transformModifier = new StateModifier({
				transform : Transform.translate(xOffset, this.topOffset, 0)
			});
			
			xOffset += width
			
			this.add(transformModifier).add(surface);
		}
	}

    MenuView.prototype = Object.create(View.prototype);
    MenuView.prototype.constructor = MenuView;

    MenuView.DEFAULT_OPTIONS = {
		tabData : [],
		topOffset : 500,
		width : 70,
		height : 60
    };

    module.exports = MenuView;
});
