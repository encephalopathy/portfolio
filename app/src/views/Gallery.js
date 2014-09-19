/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
	var ScrollView = require('famous/views/Scrollview');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var RenderNode = require('famous/core/RenderNode');
	var SequentialLayout = require('famous/views/SequentialLayout');
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
		images : { 0 : 'content/images/alien_hover_tank_combat.png',
		 		 1 : 'content/images/Bridge.png',
				 2 : 'content/images/Cityscape.png',
				 3 : 'content/images/heli_back.png',
				 4 : 'content/images/main_battle.png',
				 5 : 'content/images/Red_Sea_take_1.png',
				 6 : 'content/images/Red_Sea_take_2.png'
		}
    };
	
	function _createBackground() {
		
		var description = this.options.images[0];
		var imagePath = this.options.images[0];
		var scrollView = new ScrollView();
		
		var image = new ImageSurface({
			content : imagePath
		});
		
		var imageModifier = new StateModifier({
			size : [200, 200]
		});
		var scrollModifier = new StateModifier({
			size : [200, 200]
		});
		
		var scrollViewTransformModifier = new StateModifier({
			origin : [0.5, 0.5]
		});
		
		var imageNode = new RenderNode(imageModifier);
		imageNode.add(image);
		
		var scrollNode = new RenderNode(scrollModifier);
		scrollNode.add(scrollView);
		
		var sequence = new SequentialLayout();
		sequence.sequenceFrom([scrollNode, imageNode]);
		
		this.scrollView = scrollView;
		
		this.add(scrollViewTransformModifier).add(sequence);
		
		var surfaces = [];
		scrollView.sequenceFrom(surfaces);
		
		for (var i = 1; i < 7; ++i) {
			image = new ImageSurface({
				content : this.options.images[i]
			});
			
			image.pipe(scrollView);
			surfaces.push(image);
		}
		/*this.scrollView = new Scrollview({
			clipSize : [true, true],
			margin : [500, 500],
			friction : 0.78,
			pageDamp : 0.58
		});
		
		
		
		var scrollModifier = new StateModifier({
			size : [200, 200]
		});
		
		this.scrollModifier = scrollModifier;
		
		this.add(scrollModifier).add(this.scrollView);*/
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
		/*if (event.data == undefined) {
			images = this.options.data;
		}
		else {
			images = event.data;
			this.options.data = event.data;
		}
		*/
		
		
		
		
		
	}

    module.exports = Gallery;
});
