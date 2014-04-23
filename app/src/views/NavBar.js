/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    /*
     * @name NavBar
     * @constructor
     * @description
     */

    function NavBar() {
        View.apply(this, arguments);
    }

    NavBar.prototype = Object.create(View.prototype);
    NavBar.prototype.constructor = NavBar;

    NavBar.DEFAULT_OPTIONS = {
		HOME : 'HOME',
		PROJECTS: 'PROJECTS',
		BLOG : 'BLOG'
    };

    module.exports = NavBar;
});
