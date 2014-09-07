define(function(require, exports, module) {
	var EventHandler = require('famous/core/EventHandler');
	var dataRef = new Firebase("https://burning-fire-9618.firebaseio.com/");

	
	function PageController() {
		this._uiInputEventHandler = new EventHandler();
		this._uiOutputEventHandler = new EventHandler();
		
		EventHandler.setInputHandler(this, this._uiInputEventHandler);
		EventHandler.setOutputHandler(this, this._uiOutputEventHandler);
	}
	
	module.exports = PageController;
});

	

