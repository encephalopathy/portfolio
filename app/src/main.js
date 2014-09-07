/*globals define*/
define(function(require, exports, module) {

    // import dependencies
    var Engine = require('famous/core/Engine');
    var AppView = require('views/AppView');
	var PageController = require('controllers/PageController');
	// create the main context
	
	var pageController = new PageController();
    var mainContext = Engine.createContext();
	var appView = new AppView();
	mainContext.add(appView);
	
});
