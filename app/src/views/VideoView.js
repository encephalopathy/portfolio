/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
	var VideoSurface = require('famous/surfaces/VideoSurface');
	var ImageSurface = require('famous/surfaces/ImageSurface');
    /*
     * @name VideoView
     * @constructor
     * @description
     */

    function VideoView() {
        View.apply(this, arguments);
		_createBackground.call(this);
    }
	
	function _createBackground() {
		var backgroundSurface = new VideoSurface({
			autoplay : 'true',
			loop : 'true',
			properties : {
				preload : 'auto'
			}
		});
		
		var backgroundFirstRender = new ImageSurface({
			size : [ true, true ]
		});

		
		backgroundSurface.setContent('content/images/TableMtn.mp4');
		/*backgroundSurface.setOptions({
			loop : 'true'
		})*/
		var transformModifier = new StateModifier({
			transform : Transform.translate(0, 0, -1)
		});
		
		transformModifier.setSize({
			size : [1000, 500]
		});
		
		this.add(transformModifier).add(backgroundSurface);
		
	}

    VideoView.prototype = Object.create(View.prototype);
    VideoView.prototype.constructor = VideoView;

    VideoView.DEFAULT_OPTIONS = {
    };

    module.exports = VideoView;
});
