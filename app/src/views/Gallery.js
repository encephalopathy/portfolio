/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
	var Scrollview = require('famous/views/Scrollview');

    /*
     * @name Gallery
     * @constructor
     * @description
     */

    function Gallery() {
        View.apply(this, arguments);
		this.surfacesInView = {};
		_createBackground.call(this);
		_setListeners.call(this);
    }

    Gallery.prototype = Object.create(View.prototype);
    Gallery.prototype.constructor = Gallery;

    Gallery.DEFAULT_OPTIONS = {
		//Need to explicitly define keys for firebase, there are no concept of
		//arrays in their no sql schema.
		data : { 0 : 'content/images/RedSea_Trouble.png',
		 		 1 : 'content/images/WarScene_1.png',
				 2 : 'content/images/WarScene_2.png',
				 3 : 'content/images/WarScene_3.png',
				 4 : 'content/images/PuzzleDefenders.png',
				 5 : 'content/images/One_Day_interaction.png',
				 6 : 'content/images/Shoot_em_up_pewpew.png',
				 7 : 'content/images/simple_graphics_demo.png'
		}
    };
	
	function _createBackground() {
		this.scrollView = new Scrollview({
			clipSize : [true, true],
			margin : [500, 500],
			friction : 0.78,
			pageDamp : 0.58
		});
		
		
		
		var scrollModifier = new StateModifier({
			size : [200, 200]
		});
		
		this.scrollModifier = scrollModifier;
		
		this.add(scrollModifier).add(this.scrollView);
	}
	
	function _setListeners() {
		this.scrollView.sync.on("start", _onTouchStart.bind(this));
		this.scrollView.sync.on("update", _update.bind(this));
		this.scrollView.sync.on("end", _onTouchEnd.bind(this));
	}
	
	function _onTouchStart(event) {
		
	}
	
	function _update(event) {
		
	}
	
	function _onTouchEnd(event) {
		
	}
	
	Gallery.prototype.transitionIn = function(event, tabName) {
		var images = null;
		if (event.data == undefined) {
			images = this.options.data;
		}
		else {
			images = event.data;
			this.options.data = event.data;
		}
		for (var i = 0; i < images.length; ++i) {
			var description = images[i];
			var imagePath = images[i].imagePath;
			var image = new ImageSurface({
				content : imagePath
			});
			
			var imageModifier = new RenderNode(imageModifier);
			imageNode.add(image);
			
			var scrollNode = new RenderNode(this.scrollModifier);
			scrollNode.add(this.scrollView);
			
			
		}
		var sequence = new SequentialLayout();
		sequence.sequenceFrom([scrollNode, imageNode]);
		
	}

    module.exports = Gallery;
});
