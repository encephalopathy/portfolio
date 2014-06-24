/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name TabView
     * @constructor
     * @description
     */

    function TabView() {
        View.apply(this, arguments);
		
		_createBackground.call(this);
		_createTitle.call(this);
		//TODO: Create an Icon for each tab.
    }

    TabView.prototype = Object.create(View.prototype);
    TabView.prototype.constructor = TabView;
	
    function _createBackground() {
        var backgroundSurface = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: 'black',
                boxShadow: '0 0 1px black',
				origin : [0.5, 0.5]
            }
        });

        var transformModifier = new StateModifier({
            transform: Transform.behind
        });
		
        this.add(transformModifier).add(backgroundSurface);
    }
	
	function _createTitle() {
        var titleSurface = new Surface({
            size: [true, true],
            content: this.options.title,
            properties: {
                color: 'white',
                fontFamily: 'AvenirNextCondensed-DemiBold',
                fontSize: this.options.fontSize + 'px',
                textTransform: 'uppercase',
                pointerEvents : 'none',
				
            }
        });

        var titleModifier = new StateModifier({
        });

        this.add(titleModifier).add(titleSurface);
	}
	

    TabView.DEFAULT_OPTIONS = {
		title : 'PlaceHolderTitle',
		width : 50,
		height : 50,
		fontSize : 12
    };

    module.exports = TabView;
});
