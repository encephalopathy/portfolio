/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
	var MenuView = require('views/MenuView');
	//var HeaderData = require('views/headers')
    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView() {
        View.apply(this, arguments);
		
		_createNavBar.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

	function _createNavBar() {
		this.navBar = new MenuView();
		
		var menuViewModifier = new StateModifier({
			transform : Transform.behind
		});
		
		this.add(menuViewModifier).add(this.navBar);
	}
	
    AppView.DEFAULT_OPTIONS = {
    	
	};

    module.exports = AppView;
});
