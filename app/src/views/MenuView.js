/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Transform = require('famous/core/Transform');
	var EventHandler = require('famous/core/EventHandler');
    var StateModifier = require('famous/modifiers/StateModifier');
	var PageController = require('../controllers/PageController');
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
		_createHighlighter.call(this);
		this.pageController = new PageController();
    }
	
	function _setListeners() {
		
		this._eventInput.on('TabReflow', _resetTabs.bind(this));
		
		console.log('IS THIS AN EVENT LISTENER?');
		console.log(this);
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
		
		this.tabs = new Array();
		
		for (var i = 0; i < this.options.tabData.length; ++i) {
			console.log(this.options.tabData.length);
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
				transform : Transform.translate(xOffset, 0, 1)
			});
			
			
			xOffset += tabWidth;
			
			this.tabs.push(surface);
			this.add(transformModifier).add(surface);
		}
	}
	
	function _createHighlighter() {
		var highlighterSurfaceBackground = new Surface({
			size : [100, 25],
			properties : {
				backgroundColor : 'green'
			}
		});
		
		var initialTab = this.tabs[0];
		var orderNumber = 0;
		if (initialTab != undefined && initialTab != null) {
			orderNumber = initialTab.options.orderNumber;
		}
		
		var stateModifier = new StateModifier({
			opacity : 0.5
		});
		
		var tabWidth = this.options.width / this.options.tabData.length
		var xCoord = orderNumber * tabWidth + 100;
		var heightOffset = this.options.height * 0.25;
		stateModifier.setTransform(
			Transform.translate(xCoord, heightOffset, 6)
		);
		
		this.add(stateModifier).add(highlighterSurfaceBackground);
		
		this.highlighterTransformModifier = stateModifier;
	}
	
	function _resetTabs(event) {
		var menuOptions = this.options;
		var tabNameClicked = event.tabName;
		for (var i = 0; this.tabs.length; ++i) {
			var options = this.tabs[i].getOptions('title');
			if (tabNameClicked == options.title) {
				var orderNumber = options.orderNumber;
				console.log('computing new loc');
				//console.log(orderNumber * this.options.width);
				console.log('width: ' + options.width);
				console.log('order Num: ' + orderNumber);
				this.highlighterTransformModifier.setTransform(
					Transform.translate(orderNumber * options.width + 100, options.height * 0.372, 6),
					{ duration : 500 , curve : 'easeIn' }
				)
				break;
			}
		}
	}
	

    MenuView.prototype = Object.create(View.prototype);
    MenuView.prototype.constructor = MenuView;

    MenuView.DEFAULT_OPTIONS = {
		tabData : ['Home', 'Games', 'Other Projects', 'Gallery', 'Blog'],
		topOffset : 0,
		width : 25,
		height : 100
    };

    module.exports = MenuView;
});
