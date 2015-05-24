/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
	var EventHandler = require('famous/core/EventHandler');
	var GenericSync	  = require('famous/inputs/GenericSync');
	var MouseSync 	  = require('famous/inputs/MouseSync');
	var TouchSync	  = require('famous/inputs/TouchSync');
	GenericSync.register({ 'mouse' : MouseSync, 'touch': TouchSync});
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
		console.log('Background being created for tabView: w: ' + this.options.offset + ', h: ' + this.options.height);
        var backgroundSurface = new Surface({
            size: [100, this.options.height],
            properties: {
                backgroundColor: 'green'
            }
        });

        var transformModifier = new StateModifier({
			transform : Transform.translate(-10, this.options.offset / 2 - this.options.offset / 6, 2)
        });
		
		transformModifier.setOpacity(1);
		
		backgroundSurface.on('click', function(message) {
			message.tabName = this.options.title;
			this._eventOutput.emit('TabReflow', message);
		}.bind(this));
		
        this.add(transformModifier).add(backgroundSurface);
		
		this.background = { modifier : transformModifier, surface : backgroundSurface }
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
				textAlign : 'center'
            }
        });
		
        var titleModifier = new StateModifier({
        	transform : Transform.translate(this.options.offset / 2, 800, 6)
        });
		
		titleModifier.setTransform(
			Transform.translate(this.options.offset / 2,this.options.height / 2,6), 
			{ duration : 1000 + (this.options.orderNumber * 200), curve : 'easeInOut' }
		);
		
		titleModifier.setAlign([0, 0]);
		
		titleSurface.on('click', function(message) {
			message.tabName = this.options.title;
			this._eventOutput.emit('TabReflow', message);
		}.bind(this));
		
		this.title = { modifier : titleModifier , surface : titleSurface };
		
		this.add(titleModifier).add(titleSurface);
	}
	
	function _pageTransition(event) {
		
		var message = { msg : 'TabReflow'}
		this._eventOutput.emit('TabReflow', message);
	}
	
	TabView.prototype.changeText = function(textToChange) {
		
		if (this.title !== undefined && this.title.surface !== undefined) {
			this.title.surface.setContent(textToChange);
		}
		else {
			console.log('Title is missing');
		}
	}
	
    TabView.DEFAULT_OPTIONS = {
		title : 'PlaceHolderTitle',
		offset : 50,
		height : 50,
		width : 100,
		fontSize : 12,
		transitionIn : {
			curve : 'easeInOut',
			duration : 1000
		},
		orderNumber : 1
    };

    module.exports = TabView;
});
