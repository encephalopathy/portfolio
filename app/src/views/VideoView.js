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
			size : [
				undefined, true
			],
			autoplay : 'true',
			loop : 'true',
			properties : {
				preload : 'auto'
			}
		});
		
		backgroundSurface.setContent('content/images/TableMtn.mp4');
		
		backgroundSurface.pipe(this._eventOutput);
		
		var transformModifier = new StateModifier();
		
		this.add(transformModifier).add(backgroundSurface);
		this.transformModifier = transformModifier;
		this.backgroundSurface = backgroundSurface;
	}
	
	VideoView.prototype.transitionOut = function(tabName) {
		
		this.transformModifier.setTransform(
			Transform.translate(1000000, 0, 0), {
				curve : 'easeInOut', duration : 1000
			}
		);
		this.backgroundSurface.unpipe(this._eventOutput);
	}
	
	VideoView.prototype.transitionIn = function(tabName) {
		this.transformModifier.setTransform(
			Transform.translate(0,0,1), {
				curve : 'easeInOut', duration : 1000
			});
		
		this.backgroundSurface.pipe(this._eventOutput);
	}

    VideoView.prototype = Object.create(View.prototype);
    VideoView.prototype.constructor = VideoView;

    VideoView.DEFAULT_OPTIONS = {
    };

    module.exports = VideoView;
});
