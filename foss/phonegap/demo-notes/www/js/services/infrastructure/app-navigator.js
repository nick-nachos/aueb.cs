'use strict';

(function(angular, navigator) {

    angular.module('gr.aueb.cs.foss.notes.services.infrastructure').factory('appNavigator', [
        
        '$document', 'deviceReady', 'objectUtil',
        
        function($document, deviceReady, objectUtil) {
            
            function AppNavigator() {
                var that = this;
                
                deviceReady.whenReady().then(function() {
                    that._init();
                });
            }
            
            AppNavigator.prototype.setBackAction = function(backAction, closeApplicationOnPost) {
                this._backAction = backAction;
                this._closeApplicationOnPost = closeApplicationOnPost;
            };
            
            AppNavigator.prototype._init = function() {
                var that = this;
                
                $document.bind('backbutton', function(eventArgs) {
                    if (!objectUtil.isNull(that._backAction)) {
                        eventArgs.preventDefault();
                        that._backAction.call();
                        
                        if (that._closeApplicationOnPost) {
                            navigator.app.exitApp();
                        }
                    }
                });
            };
            
            return new AppNavigator();
        }
    ]);
    
})(window.angular, navigator);
