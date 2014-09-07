/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Transform = require('famous/core/Transform');
	var EventHandler = require('famous/core/EventHandler');
    var StateModifier = require('famous/modifiers/StateModifier');
	var TabView = require('views/TabView');
    /*
     * @name MenuView
     * @constructor
     * @description
     */

    function MenuView() {
        View.apply(this, arguments);
		_setListeners.call(this);
		_createTabs.call(this);
    }
	
	function _setListeners() {
		console.log('IS THIS AN EVENT LISTENER?');
		console.log(this);
		//this.eventHandler = new EventHandler();
		//EventHandler.setOutputHandler(this.eventHandler);
	}
	
	function _createTabs() {
		var xOffset = 0;
		var width = this.options.width;
		var height = this.options.height;
		var navigationBarContainer = new ContainerSurface();
		
		var windowWidth = window.innerWidth;
		console.log('windowWidth: ' + windowWidth);
		
		var tabWidth = this.options.width;
		if (this.options.tabData.length > 0) {
			tabWidth = tabWidth / this.options.tabData.length;
		}
		
		for (var i = 0; i < this.options.tabData.length; ++i) {
			var surface = new TabView({
				title : this.options.tabData[i],
				width : tabWidth,
				height : 50,
				orderNumber : i
			});
			
			//console.log('Regerstering surface Event handler');
			//console.log(surface.eventHandler.name);
			
			this.subscribe(surface);
			
			
			//console.log("surface text: " + this.options.tabData[i]);
			//console.log('Adding a surface');
			var transformModifier = new StateModifier({
				transform : Transform.translate(xOffset, this.options.topOffset, 0),
				origin : [0, 0.5]
			});
			
			xOffset += tabWidth;
			
			this.add(transformModifier).add(surface);
		}
		
		this._eventInput.on('TabReflow', _resetTabs.bind(this));
	}
	
	function _resetTabs(event) {
		var menuOptions = this.options;
		var tabNameClicked = event.tabName;
		
		//for (var i = 0; i < )
	}

    MenuView.prototype = Object.create(View.prototype);
    MenuView.prototype.constructor = MenuView;

    MenuView.DEFAULT_OPTIONS = {
		tabData : ['Home', 'Games', 'Other Projects', 'Gallery', 'Blog'],
		topOffset : 100,
		width : 100,
		height : 50
    };

    module.exports = MenuView;
});
