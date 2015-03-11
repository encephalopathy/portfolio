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
	var Skills = require('../views/Skills');
	var ScrollView = require('famous/views/Scrollview');
	GenericSync.register({ 'mouse' : MouseSync, 'touch': TouchSync});
	//var HeaderData = require('views/headers')
    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView(size) {
        View.apply(this, arguments);
		this.pageController = new PageController();
		this.pages = Object();
		this.pages.Home = new Object();
		this.currentTabOpened = '';
		_createNavBar.call(this);
		_setListeners.call(this);
		_createScrollView.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

	function _createNavBar() {
		
		this.navBar = new MenuView({
			width : this.options.size[0],
			topOffset : 250
		});
		
		var menuViewModifier = new StateModifier({
			transform : Transform.front
		});
		
		this.add(menuViewModifier).add(this.navBar);
	}

	
	function _setListeners() {
		
		//this.pageController.eventHandler.subscribe(this.navBar._eventInput);
		this.subscribe(this.pageController.eventHandler);
		
		//this._eventInput.on('TabReflow', _changeView.bind(this));
	}
	
	function _changeView(event) {
		var data = event.data;
		var tabName = event.tabName;
		var oldTabName = this.oldTabName;
		this.oldTabName = tabName;
		if (this.pages[tabName] == undefined) {
			switch (tabName) {
				case 'Gallery':
					this.pages[tabName] = new Gallery({ size : this.options.size });
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
			var orderNumber = this.pages[tabName].orderNumber == undefined ? 0 : this.pages[tabName].orderNumber;
			this.pages[oldTabName].transitionOut(tabName, orderNumber);
		}
		
		if (this.pages[tabName].transitionIn != undefined) {
			console.log('Data: ' + data);
			this.pages[tabName].transitionIn(data);
		}
		
	}
	
	function _createScrollView() {
		var scrollView = new ScrollView();
		var surfaces = [];
		
		
		/*for (var i = 0; i < 100; ++i) {
			var temp = new Surface({
				content : "Surface: " + (i + 1),
				size : [undefined, 100],
				properties : {
					backgroundColor : "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
					lineHeight : "100px",	
					textAlign : "center"
				}
			});
		*/	
			//surfaces.push(temp);
			var videoIntroView = new VideoView();
			videoIntroView.pipe(scrollView);
			surfaces.push(videoIntroView);
		
			var aboutMe = new AboutMe(null, this.pageController);
			aboutMe.pipe(scrollView);
			surfaces.push(aboutMe);
			
			var skills = new Skills();
			skills.pipe(scrollView);
			surfaces.push(skills);
			//}
		
		scrollView.sequenceFrom(surfaces);
		
		var stateModifier = new StateModifier({
			transform : Transform.translate(0, 0, -5)
		});
		
		this.add(scrollView);
	}
	
    AppView.DEFAULT_OPTIONS = {
    	size : [750, 750]
	};

    module.exports = AppView;
});
