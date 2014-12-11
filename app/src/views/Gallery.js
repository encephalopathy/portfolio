/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
	var Matrix = require('famous/math/Matrix');
    var StateModifier = require('famous/modifiers/StateModifier');
	var Lightbox = require('famous/views/Lightbox')
	var ScrollView = require('famous/views/Scrollview');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var RenderNode = require('famous/core/RenderNode');
	var SequentialLayout = require('famous/views/SequentialLayout');
	var GridLayout = require('famous/views/GridLayout');
	var Modifier = require('famous/core/Modifier');
	var Draggable = require('famous/modifiers/Draggable');
	var Timer = require('famous/utilities/Timer');
	var Engine = require('famous/core/Engine');
	var MathUtility = require('../MathUtility');
    /*
     * @name Gallery
     * @constructor
     * @description
     */

    function Gallery() {
        View.apply(this, arguments);
		_createLightBox.call(this);
		_createGrid.call(this);
		
		//_createBackground.call(this);
		//_createScrollView.call(this);
		//_setListeners.call(this);
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
		offScreenOffsetX : 1500,
		offScreenOffsetY : 0,
		size : [ window.innerWidth, window.innerHeight],
		orderNumber : 4,
		stabilzationTime: 100,
		scrolling : false,
		intervalSet : false,
		doneRotating : true,
    };
	
	function _createGrid() {
		var lightBox = this.lightBox;
		var scrollViews = [];
		this.imageNodes = new Array();
		var scrollview = new ScrollView();
		var contextSize = this.options.size;
		scrollview.sequenceFrom(scrollViews);
		
		var gridCells = [];
		
		var grid = new GridLayout();
		grid.sequenceFrom(gridCells);
		
		grid.mod = new Modifier();
		
		var cellCount     = 24;
		var cellMinWidth  = 200.0;
		
		var size        = this.options.size;
		grid.mod.sizeFrom(function() {

		var cellsX      = Math.floor(size[0] / cellMinWidth);
		var cellsY      = Math.ceil(cellCount * 1.0  / cellsX);
		var cellHeight  = size[0] * 1.0 / cellsX;

		grid.setOptions({dimensions:[cellsX,cellsY]});
		  return [undefined,cellsY*cellHeight];
		});

		grid.node = new RenderNode();
		grid.node.add(grid.mod).add(grid);


		for (var i = 0; i < cellCount; i++) {
		  var surface = new ImageSurface({
		    size:[undefined,undefined],
			content : this.options.images[i],
		    properties: {
		      backgroundColor:'hsl('+(i*360/12)+',75%,50%)'
		    }
		  });
		  surface.surfaceIndex = i;
		  this.imageNodes.push(surface);
		  gridCells.push(surface);
		  
		  surface.pipe(scrollview);
		  ///TODO: Have this work with good aspect ratios and
		  var viewOptions = this.options.size;
		  surface.on('click', function() {
			  if (this.shown == undefined || !this.shown) {
				  var modifiers = grid._modifiers;
				  var transform = modifiers[this.surfaceIndex].getTransform();
				  var translate = Transform.interpret(transform).translate;
				  var size = modifiers[this.surfaceIndex].getSize();
				  var center = [translate[0] + Math.round(size[0] / 2), translate[1] + Math.round(size[1] / 2)];
				  console.log(center);
				  console.log('window dims document model: ' + [window.innerWidth, window.innerHeight]);
				  console.log('window dims famo.us model: ' + viewOptions);
				  console.log('window scale factor: ' + [viewOptions[0] / window.innerWidth, viewOptions[1] / window.innerHeight])
				  center[0] = center[0] - window.innerWidth / 2;
				  center[1] = center[1] - window.innerHeight / 2;
				  var scaleFactor = [size[0] / window.innerWidth, size[1] / window.innerHeight];
				  var scaleAmount = Transform.scale(scaleFactor[0], scaleFactor[1], 1);
				  lightBox.options.inTransform = Transform.multiply(Transform.translate(center[0], center[1], 1), scaleAmount);
				  lightBox.options.outTransform = lightBox.options.inTransform;
				 this.shown = true;
				 lightBox.show(this);
		  	  }
			  else {
				  this.shown = false;
				  lightBox.hide(this);
			  }
		  });
	  	}
	  
	  scrollViews.push(grid.node);
	  this.add(scrollview);
	}
	
	function _createLightBox() {
		var lightBox = new Lightbox({
			inOpacity : 0,
			outOpacity : 0,
			overlap : true
		});
		
		lightBox.mod = new StateModifier();
		this.add(lightBox.mod).add(lightBox);
		this.lightBox = lightBox;
	}
	
	function _createScrollView() {
		
		var description = this.options.images[0];
		var scrollView = new ScrollView({
		});
		
		var scrollModifier = new StateModifier({
			size : [750, 750],
			origin : [0.5, 0.5]
		});
		
		var scrollViewTransformModifier = new StateModifier({
			origin : [0.5, 0.5],
			size : [250, 250],
			transform : Transform.translate(this.options.offScreenOffsetX, 0, -3)
		}); 
		
		this.scrollView = scrollView;
		this.add(scrollViewTransformModifier).add(scrollView);
		
		var surfaces = [];
		var surfaceModifiers = [];
		var modifiers = [];
		scrollView.sequenceFrom(surfaces);
		
		var draggable = new Draggable({
			xRange : [-220, 220],
			yRange : [0, 0]
		})
		
		for (var i = 0; i < 7; ++i) {
			image = new ImageSurface({
				//size : [500, 500],
				content : this.options.images[i]
			});
			
			draggable = new Draggable({
						xRange : [-220, 220],
						yRange : [50, 50]
			})
			
			var renderNode = new RenderNode(draggable);
			
			var modifier = new StateModifier({
			});
			
			renderNode.add(modifier).add(image);
			image.pipe(renderNode);
			
			image.pipe(scrollView);
			surfaces.push(renderNode);
			surfaceModifiers.push(modifier);
		}
		
		this.imageModifiers = surfaceModifiers;
		this.scrollViewTransformModifier = scrollViewTransformModifier;
	}
	
	function _createBackground() {
		var blackBackground = new Surface({
			size : [window.innerWidth, window.innerHeight],
			properties : {
				backgroundColor : 'black'
			}
		});
		
		var transformModifier = new StateModifier({
			origin : [0.5, 0.5],
			opacity : 0.25
		});
		
		this.add(transformModifier).add(blackBackground);
		
		this.backgroundModifier = transformModifier;
	}
	
	function _setListeners() {
		this.scrollView.sync.on("start", _onTouchStart.bind(this));
		this.scrollView.sync.on("update", _update.bind(this));
		this.scrollView.sync.on("end", _onTouchEnd.bind(this));
	}
	
	function _onTouchStart(event) {
		Timer.clear(_scrollViewStablize);
		this.doneRotating = true
	}
	
	function _update(event) {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var dir = event.delta < 0 ? -1 : 1;
		var modifiers = this.imageModifiers;
		for (var i = 0; i < modifiers.length; ++i) {
			var transformMatrix = modifiers[i].getTransform();
			var transformProperties = Transform.interpret(transformMatrix);
			var rotation = transformProperties.rotate;
			if (rotation[0] < Math.PI / 6) {
				transformMatrix = Transform.multiply(Transform.rotateX(Math.PI / 64), transformMatrix);
			}
			transformMatrix = Transform.multiply(Transform.translate(0, 0.95, 0), transformMatrix);
			modifiers[i].setTransform(transformMatrix);
		}
	}
	
	function _scrollViewStablize(event) {
		var transformModifiers = this.imageModifiers;
		
		
		if (!this.doneRotating) {
			var notDoneRotation = false;
			for (var i = 0; i < transformModifiers.length; ++i) {
				var currentTransformMatrix = transformModifiers[i].getTransform();
				var transformProperties = Transform.interpret(currentTransformMatrix)
				var rotation = transformProperties.rotate;
				
				if (rotation[0] > 0) {
					var radToRotate = (Math.PI / 120) * ( 1 / (i + 1) );
					if (rotation[0] <  radToRotate) {
						radToRotate = rotation[0];
						//Loss of precision, clamp to zero if our rotation gets to low.
						if (radToRotate = 0.000000000000001) {
							rodToRotate = 0;
							
						}
					}
					notDoneRotation = true;
					currentTransformMatrix = Transform.multiply(Transform.rotateX(-radToRotate), currentTransformMatrix);
					
					var afterTransformMatrix = Transform.interpret(currentTransformMatrix);
					var translation = afterTransformMatrix.translate;
					currentTransformMatrix = Transform.multiply(Transform.translate(0, 0, 0), currentTransformMatrix);
					transformModifiers[i].setTransform(currentTransformMatrix);
					if (translation[2] < -5) {
						transformModifiers[i].setTransform(Transform.translate(translation[0], translation[1] - 0.95, 0));
					}
					console.log(translation)
				}
			
			//TODO: Lerp back to the identity
			}
			
			
			if (notDoneRotation) {
				Timer.clear(_scrollViewStablize);
				this.doneRotatiing = true;
			}
			
		}
	}
	
	function _onTouchEnd(event) {
		//console.log(event);
		this.doneRotating = false;
		if (!this.intervalSet) {
			Timer.every(_scrollViewStablize.bind(this), 0.5);
			this.intervalSet = true;	
		}
	}
	
	Gallery.prototype.transitionIn = function(event, tabName) {
		console.log('Transition In');
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		/*this.scrollViewTransformModifier.setTransform(
			Transform.translate(centerX, centerY, -3), {
			duration : 1000, curve : 'easeInOut'
		});
		
		this.backgroundModifier.setTransform(
			Transform.translate(centerX, centerY, -5), {
				duration : 1000, curve : 'easeInOut'
			}
		)*/
	}
	
	Gallery.prototype.transitionOut = function(oldTabName, orderNumber) {
		console.log('Transition Out');
		
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		if (this.options.orderNumber < orderNumber) {
			
			this.scrollViewTransformModifier.setTransform(
				Transform.translate(centerX -this.options.offScreenOffsetX, centerY, -5), {
					duration : 1000, curve : 'easeInOut'
				}
			);
			
			this.backgroundModifier.setTransform(Transform.translate(centerX -this.options.offScreenOffsetX, centerY, -5), {
					duration : 1000, curve : 'easeInOut'
			})
		}
		else {
			this.scrollViewTransformModifier.setTransform(
				Transform.translate(this.options.offScreenOffsetX, 0, -5), {
					duration : 1000, curve : 'easeInOut'
			});
			
			this.backgroundModifier.setTransform(
				Transform.translate(this.options.offScreenOffsetX, 0, -5), {
					duration : 1000, curve : 'easeInOut'
			});
		}
	}

    module.exports = Gallery;
});
