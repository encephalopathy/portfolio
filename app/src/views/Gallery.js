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
	var Scroller = require('famous/views/Scroller');
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
		offScreenOffsetX : 2000,
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
		  var viewTemp = this;
		  surface.on('click', function() {
			  if (this.shown == undefined || !this.shown) {
				  var modifiers = grid._modifiers;
				  var transform = modifiers[this.surfaceIndex].getTransform();
				  var translate = Transform.interpret(transform).translate;
				  var size = modifiers[this.surfaceIndex].getSize();
				  var center = [translate[0] + Math.round(size[0] / 2), translate[1] + Math.round(size[1] / 2)];
				  center[0] = center[0] - window.innerWidth / 2;
				  center[1] = center[1] - window.innerHeight / 2;
				  console.log('LightBox inTransformCenter: ' + center);
				  var finalTransform = null;
				  var interuptationTransform = null;
				  var scaleFactor = [size[0] / window.innerWidth, size[1] / window.innerHeight];
				  var scaleAmount = Transform.scale(scaleFactor[0], scaleFactor[1], 0.001);
				  
				  console.log('IN TRANSFORM: ');
				  interuptationTransform = Transform.interpret(scaleAmount);
				  console.log('Scale: ' + interuptationTransform.scale);
				  
				  finalTransform = Transform.multiply(Transform.translate(0, center[1] , 1), scaleAmount);
				  interuptationTransform = Transform.interpret(finalTransform);
				  console.log('Translation: ' + interuptationTransform.translate);
				  lightBox.options.inTransform = finalTransform;
				  
				  console.log('Center y: ' + center[1]);
				  
				  var showPosY = center[1];
				  
				  //Hack for now until I get the light box to fit within the screen bounds wherever you click.
				  if (showPosY < 0) showPosY = 0;
				  //if (showPosY > size[1]) showPosY = showPosY - cellHeight / 2;
				  
				  lightBox.options.showTransform = Transform.translate(0, showPosY, 0);
				  lightBox.options.outTransform = Transform.multiply(Transform.translate(0, center[1], 0), Transform.scale(0.001, 0.001, 0.001))
				  var showTransform = Transform.interpret(lightBox.options.showTransform);
				  console.log('SHOW	 TRANFORM: ')
				  console.log('Translation: ' + showTransform.translate);
				  console.log('Scale: ' + showTransform.scale);
				  console.log('Rotation: ' + showTransform.rotation);
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
	  
	  var scrollViewTransformModifier = new StateModifier({
		  transform : Transform.translate(this.options.offScreenOffset, window.innerHeight * 0.5, -5),
		  origin : [0.5, 0.5]
	  });
	  
	  this.add(grid.mod);
	  this.add(scrollViewTransformModifier).add(scrollview);
	  this.scrollViewTransform = scrollViewTransformModifier;
	  this.scrollView = scrollview;
	}
	
	function _createLightBox() {
		var lightBox = new Lightbox({
			inOpacity : 0,
			outOpacity : 0,
			overlap : true
		});
		
		
		this.lightBox = lightBox;
		this.add(lightBox);
	}
	
	Gallery.prototype.transitionIn = function(event, tabName) {
		console.log('Transition In');
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		
		this.scrollViewTransform.setTransform(
			Transform.translate(centerX, centerY, -5), { 
				duration : 1000, curve : 'easeInOut'
			}
		)
	}
	
	Gallery.prototype.transitionOut = function(oldTabName, orderNumber) {
		console.log('Transition Out');
		
		var centerX = window.innerWidth * 0.5;
		var centerY = window.innerHeight * 0.5;
		if (this.options.orderNumber < orderNumber) {
			
			this.scrollViewModifier.setTransform(
				Transform.translate(centerX -this.options.offScreenOffsetX, centerY, -5), {
					duration : 1000, curve : 'easeInOut'
				}
			);
		}
		else {
			this.scrollViewModifier.setTransform(
				Transform.translate(this.options.offScreenOffsetX, 0, -5), {
					duration : 1000, curve : 'easeInOut'
			});
		}
	}

	Engine.on('prerender', function(event){
		
	})
    module.exports = Gallery;
});
