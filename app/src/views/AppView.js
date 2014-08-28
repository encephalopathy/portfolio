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
	GenericSync.register({ 'mouse' : MouseSync, 'touch': TouchSync});
	//var HeaderData = require('views/headers')
    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView() {
        View.apply(this, arguments);
		
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
		
		this.add(backgroundViewModifier).add(backgroundVideo);
	}
	
	function _setListeners() {
		this.eventHandler = new EventHandler();
		this.navBar.on('click', function() { 
			console.log('CLICKED');
		}.bind(this));
	}
	
    AppView.DEFAULT_OPTIONS = {
    	
	};

    module.exports = AppView;
});
