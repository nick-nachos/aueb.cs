'use strict';

(function (angular) {

    angular.module('gr.aueb.cs.foss.notes.directives.gestures').directive('dragToDismiss', [
        
        '$drag', '$parse', '$timeout', 'gestureState',
        
        function ($drag, $parse, $timeout, gestureState) {
            return {
                restrict: 'A',
                compile: function (elem, attrs) {
                    var dismissFn = $parse(attrs.dragToDismiss);
                    return function (scope, elem) {
                        var dismiss = false;

                        $drag.bind(elem, {
                            transform: $drag.TRANSLATE_HORIZONTAL,
                            move: function (dragInfo) {
                                gestureState.dragging();
                                
                                if (Math.abs(dragInfo.distanceX) >= dragInfo.rect.width / 3) {
                                    dismiss = true;
                                    elem.addClass('dismiss');
                                } else {
                                    dismiss = false;
                                    elem.removeClass('dismiss');
                                }
                            },
                            cancel: function () {
                                elem.removeClass('dismiss');
                            },
                            end: function (dragInfo) {
                                if (dismiss) {
                                    elem.addClass('dismissed');
                                    $timeout(function () {
                                        scope.$apply(function () {
                                            dismissFn(scope);
                                            dragInfo.reset();
                                            elem.removeClass('dismiss');
                                            elem.removeClass('dismissed');
                                        });
                                    }, 300);
                                } else {
                                    dragInfo.reset();
                                }
                            }
                        }, {
                            valid: function(touchInfo) {
                                return touchInfo.direction === "LEFT" || touchInfo.direction === "RIGHT";
                            }
                        });
                    };
                }
            };
        }
    ]);

})(window.angular);
