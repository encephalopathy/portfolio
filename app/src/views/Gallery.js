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
		},
		offScreenOffsetX : 1000,
		offScreenOffsetY : 0,
		orderNumber : 4
    };
	
	function _createBackground() {
		
		var description = this.options.images[0];
		var scrollView = new ScrollView();
		
		var scrollModifier = new StateModifier({
			size : [500, 500],
			origin : [0.5, 0.5]
		});
		
		var scrollViewTransformModifier = new StateModifier({
			origin : [0.5, 0.5],
			transform : Transform.translate(this.options.offScreenOffsetX, 0, 5)
		}); 
		
		var scrollNode = new RenderNode(scrollModifier);
		scrollNode.add(scrollView);
		
		var sequence = new SequentialLayout();
		sequence.sequenceFrom([scrollNode]);
		
		this.scrollView = scrollView;
		
		this.add(scrollViewTransformModifier).add(sequence);
		
		var surfaces = [];
		scrollView.sequenceFrom(surfaces);
		
		for (var i = 0; i < 7; ++i) {
			image = new ImageSurface({
				content : this.options.images[i]
			});
			
			image.pipe(scrollView);
			surfaces.push(image);
		}
		
		this.scrollViewTransformModifier = scrollViewTransformModifier;
	}
	
	function _setListeners() {
		this.scrollView.sync.on("start", _onTouchStart.bind(this));
		this.scrollView.sync.on("update", _update.bind(this));
		this.scrollView.sync.on("end", _onTouchEnd.bind(this));
	}
	
	function _onTouchStart(event) {
		console.log(event);
	}
	
	function _update(event) {
		
	}
	
	function _onTouchEnd(event) {
		
	}
	
	Gallery.prototype.transitionIn = function(event, tabName) {
		console.log('Transition In');
		
		
		this.scrollViewTransformModifier.setTransform(
			Transform.translate(0, 0, 5), {
			duration : 1000, curve : 'easeInOut'
		});
	}
	
	Gallery.prototype.transitionOut = function(oldTabName, orderNumber) {
		console.log('Transition Out');
		if (this.options.orderNumber < orderNumber) {
			
			this.scrollViewTransformModifier.setTransform(
				Transform.translate(-1000, 0, 5), {
					duration : 1000, curve : 'easeInOut'
				}
			);
		}
		else {
			this.scrollViewTransformModifier.setTransform(
				Transform.translate(1000, 0, 5), {
					duration : 1000, curve : 'easeInOut'
			});
		}
	}

    module.exports = Gallery;
});
