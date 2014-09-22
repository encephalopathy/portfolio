define(function(require, exports, module) {
	var EventHandler = require('famous/core/EventHandler');
	var dataRef = new Firebase("https://burning-fire-9618.firebaseio.com/");
	

	function PageController() {
		this._uiInputEventHandler = new EventHandler();
		this._uiOutputEventHandler = new EventHandler();
		
		this.eventHandler = new EventHandler();
		
		_setListeners.call(this);
		
	}
	
	function _setListeners() {
		this.eventHandler.on('TabReflow', _grabContents.bind(this));
	}
	
	function _grabContents(event) {
		var name = event.tabName;
		console.log('SUCCESSFULLY Grabbed contents')
		if (name != undefined ) {
			var data = dataRef.child(name);
		}
		event.name = "LoadView";
		event.data = data;
		this.eventHandler.emit("LoadView", event);
	}
	
	module.exports = PageController;
});

	

