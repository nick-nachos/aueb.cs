'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.services.ui').factory('orientation', [
        
        '$window', '$rootScope', 'objectUtil',
        
        function($window, $rootScope, objectUtil) {
            function Orientation() {
                this._applyOrientation();
                var that = this;
                this.addOrientationListener(function() {
                    that._applyOrientation();
                });
            }
            
            Orientation.prototype.addOrientationListener = function(listener) {
                $window.addEventListener('orientationchange', function() {
                    $rootScope.$apply(listener);
                });
            };
            
            Orientation.prototype._applyOrientation = function() {
                // if desktop browser
                if (objectUtil.isNull($window.orientation)) {
                    this._portrait = false;
                    return;
                }
                
                switch ($window.orientation) {
                    case 90:
                    case -90:
                        this._portrait = false;
                        break;
                    default:
                        this._portrait = true;
                        break;
                }
            };
            
            Object.defineProperty(Orientation.prototype, "landscape", {
                get: function() { 
                    return !this._portrait; 
                }
            });
            
            Object.defineProperty(Orientation.prototype, "portrait", {
                get: function() { 
                    return this._portrait; 
                }
            });
           
            return new Orientation();
        }
    ]);
    
})(window.angular);
