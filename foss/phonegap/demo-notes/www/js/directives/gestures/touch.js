'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.directives.gestures').directive('touch', [
        
        '$touch', '$parse', 'gestureState',
        
        function($touch, $parse, gestureState) {
            return {
                restrict: 'A',
                compile: function (elem, attrs) {
                    var touchFn = $parse(attrs.touch);
                    
                    return function (scope, elem) {
                        $touch.bind(elem, {
                            start: function() {
                                scope.$apply(function() {
                                    gestureState.reset();
                                });
                            },
                            end: function() {
                                scope.$apply(function() {
                                    try {
                                        if (gestureState.isSimpleTouch()) {
                                            touchFn(scope);
                                        }
                                    }
                                    finally {
                                        gestureState.reset();
                                    }
                                });
                            }
                        }, {
                            valid: function(touchInfo) {
                                if (touchInfo.averageVelocity === 0) {
                                    return true;
                                }
                                
                                return touchInfo.direction === "LEFT" || touchInfo.direction === "RIGHT";
                            }
                        });
                    };
                }
            };
        }
    ]);
    
})(window.angular);
