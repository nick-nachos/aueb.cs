'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.services.infrastructure').factory('deviceReady', [
        
        '$q', '$document', 'arrayUtil',
        
        function($q, $document, arrayUtil) {
            
            function DeviceReady() {
                this._pendingPromises = [];
                this._isDeviceReady = false;
                var that = this;
                
                // For some shitty reason $document.bind() misses 'deviceready' event if it is already fired.
                $document[0].addEventListener('deviceready', function() {
                    that._onDeviceReady();
                });
            }
            
            DeviceReady.prototype.whenReady = function() {
                var deferred = $q.defer();
                
                if (this._isDeviceReady) {
                    deferred.resolve();
                }
                else {
                    this._pendingPromises.push(deferred);
                }
                
                return deferred.promise;
            };
            
            DeviceReady.prototype._onDeviceReady = function() {
                this._isDeviceReady = true;
                
                arrayUtil.forEach(this._pendingPromises, function(deferred) {
                    deferred.resolve();
                });
            };
            
            return new DeviceReady();
        }
    ]);
    
})(window.angular);
