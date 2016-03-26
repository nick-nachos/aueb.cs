'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.services.ui').factory('gestureState', [
        
        function() {
            
            function GestureState() {
                this.reset();
            }
            
            GestureState.prototype.reset = function() {
                this._dragging = false;
            };
            
            GestureState.prototype.isSimpleTouch = function() {
                return !this._dragging;
            };
            
            GestureState.prototype.dragging = function(value) {
                this._dragging = true;
            };
            
            return new GestureState();
        }
    ]);
    
})(window.angular);
