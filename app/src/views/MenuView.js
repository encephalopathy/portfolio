/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Transform = require('famous/core/Transform');
	var EventHandler = require('famous/core/EventHandler');
    var StateModifier = require('famous/modifiers/StateModifier');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var TabView = require('views/TabView');
    /*
     * @name MenuView
     * @constructor
     * @description
     */

    function MenuView(size) {
        View.apply(this, arguments);
		_setListeners.call(this);
		_createBackground.call(this);
		_createTabs.call(this);
		//_createHighlighter.call(this);
		_createHamburgerView.call(this);
    }
	
	function _setListeners() {
		this._eventInput.on('TabReflow', _resetTabs.bind(this));
	}
	
	function _createBackground() {
		var blackBackgroundSurface = new Surface({
			size : [100, undefined],
			properties : {
				backgroundColor : 'black'
			}
		});
		
		var transformModifier = new StateModifier({
			transform : Transform.translate(0, 0, 1),
			origin : [0, 0]
		});
		
		this.add(transformModifier).add(blackBackgroundSurface);
		
		this.blackBackgroundModifier = transformModifier;
	}
	
	function _createTabs() {
		var xOffset = 0;
		var width = this.options.width;
		var height = this.options.height;
		
		var tabWidth = this.options.height;
		if (this.options.tabData.length > 0) {
			tabWidth = tabWidth / this.options.tabData.length;
		}
		
		this.tabs = new Array();
		this.tabModifiers = new Array();
		
		for (var i = 0; i < this.options.tabData.length; ++i) {
			var surface = new TabView({
				title : this.options.tabData[i],
				parentTranslation: xOffset,
				offset : tabWidth + 25,
				width : 100,
				height : 50,
				orderNumber : i
			});
			
			this.subscribe(surface);
			var transformModifier = new StateModifier({
				transform : Transform.translate(20, xOffset + 50, 1)
			});
			
			xOffset += tabWidth + 20;
			
			this.tabs.push(surface);
			this.tabModifiers.push(transformModifier);
			this.add(transformModifier).add(surface);
		}
	}
	
	function _createHighlighter() {
		var highlighterSurfaceBackground = new Surface({
			size : [100, 25],
			properties : {
				backgroundColor : 'gray'
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
		var heightOffset = this.options.height * 0.1875;
		stateModifier.setTransform(
			Transform.translate(xCoord, heightOffset, 6)
		);
		
		this.add(stateModifier).add(highlighterSurfaceBackground);
		
		this.highlighterTransformModifier = stateModifier;
	}
	
	function _createHamburgerView() {
		var hamburgerMenuButton = new ImageSurface({
			content : 'content/images/hamburger_view.png',
			size : [35, 35],
			properties : {
				backgroundColor : 'white'
			}
		});
		
		var transformModifier = new StateModifier({
			transform : Transform.translate(25, 7.55, 3),
			origin : [0, 0]
		});
		
		this.add(transformModifier).add(hamburgerMenuButton);
		
		this.hamburgerTransformModifier = transformModifier;
		this.visible = true;
		
		hamburgerMenuButton.on('click', _fadeNavigationBarInOut.bind(this));
	}
	
	function _fadeNavigationBarInOut(event) {
		var numberOfTabs = this.tabs.length;
		var maxFadeDuration = this.options.fadeDuration;
		var fadeDelta = numberOfTabs != 0 ? maxFadeDuration / numberOfTabs : maxFadeDuration;
		for (var i = 0; i < numberOfTabs; ++i) {
			var tab = this.tabModifiers[i];
			tab.setOpacity(this.visible ? 0 : 1, 
				{ duration : fadeDelta * i, curve : 'easeInOut' })
		}
		this.blackBackgroundModifier.setOpacity(this.visible ? 0 : 1, 
				{ duration : maxFadeDuration + 200, curve : 'easeInOut' });
		//this.highlighterTransformModifier.setOpacity(this.visible ? 0 : 1, 
		//		{ duration : maxFadeDuration, curve : 'easeInOut' });
		this.visible = !this.visible;
	}
	
	function _resetTabs(event) {
		var menuOptions = this.options;
		var tabNameClicked = event.tabName;
		for (var i = 0; this.tabs.length; ++i) {
			var options = this.tabs[i].getOptions();
			if (tabNameClicked == options.title) {
				var orderNumber = options.orderNumber;
				/*this.highlighterTransformModifier.setTransform(
					Transform.translate(orderNumber * options.offset + 75, options.height * 0.372, 6),
					{ duration : 500 , curve : 'easeIn' }
				)*/
				break;
			}
		}
	}
	

    MenuView.prototype = Object.create(View.prototype);
    MenuView.prototype.constructor = MenuView;

    MenuView.DEFAULT_OPTIONS = {
		tabData : ['Home', 'About Me', 'Gallery', 'Blog'],
		topOffset : 0,
		tabWidth: 30,
		width : window.innerWidth,
		height : window.innerHeight,
		height : 100,
		fadeDuration : 2500
    };

    module.exports = MenuView;
});
