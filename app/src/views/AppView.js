/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
	var EventHandler = require('famous/core/EventHandler');
	var MenuView = require('views/MenuView');
	var VideoView = require('views/VideoView');
	var GenericSync	  = require('famous/inputs/GenericSync');
	var MouseSync 	  = require('famous/inputs/MouseSync');
	var TouchSync	  = require('famous/inputs/TouchSync');
	var PageController = require('../controllers/PageController');
	var Gallery = require('../views/Gallery');
	var AboutMe = require('../views/AboutMe');
	GenericSync.register({ 'mouse' : MouseSync, 'touch': TouchSync});
	//var HeaderData = require('views/headers')
    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView() {
        View.apply(this, arguments);
		this.pageController = new PageController();
		this.pages = Object();
		this.pages['Home'] = new Object();
		this.currentTabOpened = "";
		
		_createNavBar.call(this);
		_createBackground.call(this);
		_setListeners.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

	function _createNavBar() {
		
		this.navBar = new MenuView({
			width : window.innerWidth,
			topOffset : 250
		});
		
		var menuViewModifier = new StateModifier({
			transform : Transform.front
		});
		
		this.add(menuViewModifier).add(this.navBar);
	}
	
	function _createBackground() {
		var backgroundVideo = new VideoView();
		
		var backgroundViewModifier = new StateModifier({
			transform : Transform.behind
		});
		this.backgroundViewModifier = backgroundViewModifier;
		this.add(backgroundViewModifier).add(backgroundVideo);
	}
	
	function _setListeners() {
		
		this.pageController.eventHandler.subscribe(this.navBar._eventInput);
		this.subscribe(this.pageController.eventHandler);
		
		this._eventInput.on('TabReflow', _changeView.bind(this));
	}
	
	function _changeView(event) {
		var data = event.data;
		var tabName = event.tabName;
		console.log("Changing views: " + tabName);
		var oldTabName = this.oldTabName;
		this.oldTabName = tabName;
		if (this.pages[tabName] == undefined) {
			switch (tabName) {
				case 'Gallery':
					this.pages[tabName] = new Gallery(data, this.pageController);
				break;
				case 'About Me':
					this.pages[tabName] = new AboutMe(data, this.pageController);
				break;
			}
			
			var stateModifier = new StateModifier({
				transform : Transform.translate(0, 0, 7)
			});
			this.add(stateModifier).add(this.pages[tabName]);
		}
		
		if (oldTabName != undefined && oldTabName != tabName && this.pages[oldTabName].transitionOut != undefined) {
			this.pages[oldTabName].transitionOut(tabName);
		}
		
		if (this.pages[tabName].transitionIn != undefined) {
			this.pages[tabName].transitionIn(data);
		}
		
	}
	
    AppView.DEFAULT_OPTIONS = {
    	
	};

    module.exports = AppView;
});
