define(function(require, exports, module) {
	
	var Matrix = require('famous/math/Matrix');
	
	function MathUtility() {
		
	}
	
	function lerp(matrixA, matrixB, t) {
		if (t > 1 || t < 0) return undefined;
		var tStep = 1 - t;
		//(1 - t) * (matrixA - matrixB) + matrixA
		return this.addMatrix(
			this.subtractMatrix(matrixB, matrixA).vectorMultipy([tStep, tStep, tStep]),
			matrixA);
		}
		

		//TODO: Fork matrix addition and subtraction calculations to the GPU 
		function addMatrix(matrixA, matrixB) {
			if (null != matrixA && undefined != matrixA && null != matrixB && undefined != matrixB) {
				return [ matrixA[0] + matrixB[0], matrixA[1] + matrixB[1], matrixA[2] + matrixB[2],
				matrixA[3] + matrixB[3], matrixA[4] + matrixB[4], matrixA[5] + matrixB[5],
				matrixA[6] + matrixB[6], matrixA[7] + matrixB[7], matrixA[8] + matrixB[8]
				]
			}
		}

		function subtractMatrix(matrixA, matrixB) {
			if (null != matrixA && undefined != matrixA && null != matrixB && undefined != matrixB) {
				return [ matrixA[0] + matrixB[0], matrixA[1] + matrixB[1], matrixA[2] + matrixB[2],
				matrixA[3] - matrixB[3], matrixA[4] - matrixB[4], matrixA[5] + matrixB[5],
				matrixA[6] - matrixB[6], matrixA[7] - matrixB[7], matrixA[8] - matrixB[8]
				]
			}
		}
		
		module.exports = MathUtility;
});

