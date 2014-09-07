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
		backgroundSurface.on('click', function(message){
			console.log('CLICKED ON BACKGROUND SURFACE');
			//console.log('page transition');
			//console.log(this.eventHandler);
			console.log('Page transition: ');
			console.log(this);
			this._eventOutput.emit('TabReflow', message);
		}.bind(this));
		
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
        	transform : Transform.translate(0, 100, 0)
        });
		
		titleModifier.setTransform(
			Transform.translate(0,0,0), 
			{ duration : 1000 + (this.options.orderNumber * 200), curve : 'easeInOut' }
		);
		
		this.title = { modifier : titleModifier , surface : titleSurface };
		
		this.add(titleModifier).add(titleSurface);
	}
	
	function _pageTransition(event) {
		
		/*for (var i in event) {
			console.log("Element to print on click event: " + i);
		}*/
		
		var message = { msg : 'TabReflow'}
		this._eventOutput.emit('TabReflow', message);
	}
	
	TabView.prototype.changeText = function(textToChange) {
		
		if (this.title != undefined && this.title.surface != undefined) {
			this.title.surface.setContent(textToChange);
		}
		else {
			console.log("Title is missing");
		}
	}
	
    TabView.DEFAULT_OPTIONS = {
		title : 'PlaceHolderTitle',
		width : 50,
		height : 50,
		fontSize : 12,
		transitionIn : {
			curve : 'easeInOut',
			duration : 1000
		},
		orderNumber : 1
    };

    module.exports = TabView;
});
