'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.util').factory('arrayUtil', [
        
        function() {
            
            function ArrayUtil() { }
            
            ArrayUtil.prototype.forEach = function(array, loopAction) {
                var loopContext = {
                    breakLoop: false,
                    index: -1
                };
                
                for (var i = 0; i < array.length; i++) {
                    loopContext.index = i;
                    loopAction.call(null, array[i], loopContext);
                    
                    if (loopContext.breakLoop) {
                        break;
                    }
                }
            };
            
            ArrayUtil.prototype.indexOfMatch = function(array, predicate) {
                var index = -1;
                
                this.forEach(array, function(arrayItem, loopContext) {
                    if (predicate.call(null, arrayItem, loopContext.index)) {
                        index = loopContext.index;
                        loopContext.breakLoop = true;
                    }
                });
                
                return index;
            };
            
            ArrayUtil.prototype.getFirstMatch = function(array, predicate) {
                var match = null;
                
                this.forEach(array, function(arrayItem, loopContext) {
                    if (predicate.call(null, arrayItem, loopContext.index)) {
                        match = arrayItem;
                        loopContext.breakLoop = true;
                    }
                });
                
                return match;
            };
            
            ArrayUtil.prototype.range = function(from, length) {
                var array = new Array(length);
                
                for (var i = 0; i < length; i++) {
                    array[i] = from + i;
                }
                
                return array;
            };
            
            return new ArrayUtil();
        }
    ]);
    
})(window.angular);
